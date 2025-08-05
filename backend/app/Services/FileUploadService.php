<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;


class FileUploadService{

    static function base64_to_image($base64_string){
        $data = explode(",", $base64_string);
        
        if (!preg_match('/^data:(.*);base64,/', $base64_string, $matches)) {
            throw new \Exception('Invalid MIME type: ' . $base64_string);
        }

        $mime = $matches[1];
        $allowed_mimes = ['image/png', 'image/jpg', 'image/jpeg'];

        if(!in_array($mime, $allowed_mimes)){
            throw new \Exception('Only png, jpg, jpeg formats are allowed');
        }


        $extension = explode('/', $matches[1])[1] ?? 'bin';

        $image = base64_decode($data[1]);

        if(strlen($image) > 5 * 1024* 1024){
            throw new \Exception('Max size is 5MB');
        }

        $file_name = "image_" . now()->format("Ymd_His") . "." . $extension;
        $file_path = "images/" . $file_name;

        Storage::disk("public")->put($file_path, $image);

        return $file_path;
    }
}
