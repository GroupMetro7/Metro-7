<?php

namespace App\Mail;

use App\Models\User;
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
  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function build()
  {
    $verificationUrl = url('/authverify-email/' . $this->user->email_verification_code);

    return $this->subject('Welcome to Metro 7')->markdown('emails.verify_email')
      ->with([
        'user' => $this->user,
        'verificationUrl' => $verificationUrl,
      ]);
  }

      public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Out Of Stock Notification',
        );
    }

        public function content(): Content
    {
        return new Content(
            markdown: 'emails.verify_email',
        );
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
