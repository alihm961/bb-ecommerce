<?php
use App\Models\ChatSession;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('chat.{session.id}', function ($user, $sessionId) {
    return ChatSession::where('id', $sessionId)
    ->where('user_id', $user->id)
    ->exists();
});
Broadcast::channel('chat.admin', function ($user) {
    return $user->role === 'admin'; // Only admins can listen to escalated chats
});

