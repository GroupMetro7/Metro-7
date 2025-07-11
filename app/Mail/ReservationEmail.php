<?php

namespace App\Mail;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationEmail extends Mailable
{
  use Queueable, SerializesModels;

  public $user;
  public $reservation;

  public function __construct(User $user, Reservation $reservation)
  {
    $this->user = $user;
    $this->reservation = $reservation;
  }

  public function build()
  {
    return $this->subject('Reservation notification')
      ->markdown('emails.reservation_notification');
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: 'Reservation Email',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      view: 'emails.reservation_notification',
      with: [
        'user' => $this->user,
        'reservation' => $this->reservation,
      ],
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
