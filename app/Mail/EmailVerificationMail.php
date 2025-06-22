<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }
        public function build()
    {
        $verificationUrl = url('/authverify-email/' . $this->user->email_verification_code);

return $this->markdown('emails.verify_email')
    ->subject('Verify Your Email Address')
    ->with([
        'user' => $this->user,
        'verificationUrl' => $verificationUrl,
    ]);
    }
    
}
