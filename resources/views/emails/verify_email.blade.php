{{-- filepath: resources/views/emails/verify_email.blade.php --}}
@component('mail::message')
# Verify Your Email Address

Hello {{ $user->firstname }},  Please verify your email address to complete your registration.

@component('mail::button', ['url' => $verificationUrl])
Verify Email
@endcomponent

If you did not create an account, no further action is required.

Thanks,<br>
{{ config('app.name') }}
@endcomponent