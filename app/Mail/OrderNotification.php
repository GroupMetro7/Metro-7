<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Order;
class OrderNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $order;

    public function __construct(User $user,Order $order)
    {
        $this->user = $user;
        $this->order = $order;
    }

    public function build()
{
    return $this->view('emails.order_notification')
        ->with([
            'user' => $this->user,
            'order' => $this->order,
        ]);
}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Order Notification',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order_notification',
            with: [
                'user' => $this->user,
                'order' => $this->order,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}