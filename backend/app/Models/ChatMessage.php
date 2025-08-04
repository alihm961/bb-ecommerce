<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $fillable = [
        'session_id',
        'sender_id',
        'sender_type',
        'content'];

    public function session(){
        return $this->belongsTo(ChatSession::class);
    }

    public function sender() {
        return $this->  belongsTo(User::class, 'sender_id');
    }
}
