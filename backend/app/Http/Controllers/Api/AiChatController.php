<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Message\SendChatMessageRequest;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponseTrait;
use App\Jobs\ProcessChatMessageJob;
use Illuminate\Http\Request;

class AiChatController extends Controller
{
    use ApiResponseTrait;

    public function sendMessage(SendChatMessageRequest $request)
    {
        $user = Auth::user();
        $sessionId = $request->input('session_id');

        
        if(!$sessionId) {
            $session = ChatSession::create([
                'user_id' => $user->id,
                'status' => 'active',
            ]);
            $sessionId = $session->id;
        } else {
            $session = ChatSession::where('id', $sessionId)
            ->where('user_id',$user->id)
            ->firstOrFail();
        }
        
        //store the message
        $message = ChatMessage::create([
            'session_id' => $sessionId,
            'sender_type' => 'user',
            'sender_id' =>$user->id,
            'content' => $request->input('message'),
        ]);

        ProcessChatMessageJob::dispatch($session, $message);

        return $this->success([
            'session_id' => $sessionId,
            'message_id' => $message->id,
        ],'Message sent successfully');
    }
    //chat history
    public function getMessage($sessionId)
    {
        $session = ChatSession::where('id', $sessionId)
        ->where('user_id', Auth::id())
        ->with('messages')
        ->firstOrFail();

    return $this->success($session->messages,'Chat history fetched');
    }
}
