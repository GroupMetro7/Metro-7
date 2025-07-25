<?php

namespace App\Mail;

use App\Models\StockManagement;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LowOnStockAlert extends Mailable
{
    use Queueable, SerializesModels;

    public $StockItem;

    public function __construct(StockManagement $StockItem)
    {
        $this->StockItem = $StockItem;
    }

        public function build()
    {
      return $this->subject('Out of stock notification')
                  ->markdown('emails.low_stock_alert');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Low On Stock Alert',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.low_stock_alert',
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
