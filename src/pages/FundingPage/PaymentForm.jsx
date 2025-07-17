import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { use } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import useAxios from '../../hooks/useAxios';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [amountError, setAmountError] = useState("");
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(e.target.amount.value);
        if (isNaN(amount) || amount <= 0) {
            setAmountError("Invalid amount");
            return;
        }

        const amountInCents = amount * 100;
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log('payment method', paymentMethod);

            const res = await axiosInstance.post('/create-payment-intent', {
                amountInCents,
            })

            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    const transactionId = result.paymentIntent.id;

                    const paymentData = {
                        name: user.displayName,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosInstance.post('/funds', paymentData);
                    if (paymentRes.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to Funds',
                        });
                        navigate('/funds');
                    }
                }
            }
        }
    }

    return (
        <div className='min-h-screen flex items-start justify-center'>
            <form onSubmit={handleSubmit} className="mt-24 space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <h1 className="text-4xl font-bold my-8">Donation Form !</h1>
                <label className="input w-full">
                    <span className="label">$</span>
                    <input name='amount' type="text" placeholder="Donation Amount !" required />
                </label>
                {
                    amountError && <p className='text-red-500 text-sm'>{amountError}</p>
                }
                <CardElement className="p-2 border rounded">
                </CardElement>
                <button
                    type='submit'
                    className="btn btn-primary text-white w-full"
                    disabled={!stripe}
                >
                    Pay
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;