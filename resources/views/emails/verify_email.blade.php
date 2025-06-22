{{-- resources/views/emails/verify_email.blade.php --}}
<h2>Verify Your Email Address</h2>
<p>
    BOBO KA CLICK MO TO!
</p>
<p>
    <a href="{{ $verificationUrl }}">{{ $verificationUrl }}</a>
</p>
<p>
    If you did not create an account, no further action is required.
</p>
<p>
    Thanks,<br>
    {{ config('app.name') }}
</p>