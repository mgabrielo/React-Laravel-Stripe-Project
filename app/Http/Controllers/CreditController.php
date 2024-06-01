<?php

namespace App\Http\Controllers;

use Stripe\Webhook;
use App\Models\Feature;
use App\Models\Package;
use Stripe\StripeClient;
use App\Models\Transaction;
use Illuminate\Http\Request;
use UnexpectedValueException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\PackageResource;
use Stripe\Exception\SignatureVerificationException;

class CreditController extends Controller
{
    public function index()
    {
        $packages = Package::all();
        $features=Feature::where('active', true)->get();
        return inertia("Credit/index",[
            'packages'=>PackageResource::collection($packages),
            'features'=>FeatureResource::collection($features),
            'success'=>session('success'),
            'error'=>session('error'),
        ]);
    }
    
    public function buyCredits(Package $package)
    {
        $stripe= new StripeClient(env('STRIPE_SECRET_KEY'));
       
        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'gbp',
                        'product_data' => [
                            'name' => $package->name . '-' . $package->credits . ' credits',
                        ],
                        'unit_amount' => $package->price * 100, 
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('credit.success', [], true),
            'cancel_url' => route('credit.cancel', [], true),
        ]);


        Transaction::create([
            'status'=>'pending',
            'price'=>$package->price,
            'credits'=>$package->credits,
            'package_id'=>$package->id,
            'session_id'=>$checkout_session->id,
            'user_id'=>Auth::id(),
        ]);

        return redirect($checkout_session->url);
    }

    public function success()
    {
        return to_route('credit.index')->with('success', 'You Have Bought New Credits Successfully');
    }
    
    public function cancel()
    {
        return to_route('credit.index')->with('error','Error Occurred In Payment Process Please Try Again');
    }

    public function webhook()
    {
        
        $endpoint_secret=env('STRIPE_WEBHOOK_KEY');
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;
        try{
            $event= Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
            Log::info($event);
        }       
        catch(UnexpectedValueException $e){
            return response('',400);
        }catch(SignatureVerificationException $e){
            return response('',400);
        }
        Log::info($event->type);

        switch($event->type){
            case 'checkout.session.completed':
                $session=$event->data->object;
                $transaction=Transaction::where('session_id', $session->id)->first();

                if($transaction && $transaction->status === 'pending'){

                    $transaction->status ='paid';
                    $transaction->save();
                    $transaction->user->available_credits += $transaction->credits;
                    $transaction->user->save(); 
                }else if ($transaction && $transaction->status === 'succeeded'){
                    $transaction->status ='paid';
                    $transaction->save();
                    $transaction->user->available_credits += $transaction->credits;
                    $transaction->user->save(); 
                }
            default:
                echo 'Received Unknown Event Type' . $event->type;
        }
        return response('',200);
    }
}
