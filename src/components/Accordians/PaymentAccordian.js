import React, { useState, useEffect } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_URL } from '../../AppConstant'
import { fetchAgents } from '../apiCalls/fetchData'


function PaymentAccordian({ active, setActive }) {
    const [stripe, setStripe] = useState(null);
    const [flyremit, setFlyremit] = useState(null);
    const [commision, setCommision] = useState(0);
    const [link, setLink] = useState(['www.google.com']);
    const [agents, setAgents] = useState([]);

    const paymentSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email({ message: "Valid email is required" }),
        currency: z.string().min(1, { message: "Currency is required" }),
        amount: z.number().positive({ message: "Amount must be positive" }),
        xerate: z.number().positive({ message: "XE Rate must be positive" }),
        commision: z.number()
    });

    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            name: '',
            email: '',
            currency: '',
            amount: '',
            xerate: '',
            commision: 0
        }
    });

    useEffect(() => {
        setStripe(document.querySelector('#stripe'));
        setFlyremit(document.querySelector('#flyremit'));
    }, []);

    useEffect(() => {
        setValue('commision', commision);
    }, [commision, setValue]);

    const submit = async (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to create a payment link of ${((data.amount * data.xerate) + (data.amount * data.xerate) * (commision / 100)).toFixed(2)} ${data.currency}`,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.post(`${API_URL}users/createPaymentLink`, data, {
                    withCredentials: true,
                    headers: {
                        "content-type": "application/json"
                    }
                })
                if (response.status === 200) {
                    setLink([...link, response.data.url]);
                }
            }
        });
        console.log(data);
    }

    const handlePaymentMethod = (method) => {
        if (method === 'stripe') {
            setCommision(5);
            stripe?.classList.add('bg-violet-600', "text-white");
            stripe?.classList.remove('bg-slate-300', "text-black");
            flyremit?.classList.remove('bg-blue-600', "text-white");
            flyremit?.classList.add('bg-slate-300', "text-black");
        } else {
            setCommision(1.5);
            flyremit?.classList.add('bg-blue-600', "text-white");
            flyremit?.classList.remove('bg-slate-300');
            stripe?.classList.remove('bg-violet-600', "text-white");
            stripe?.classList.add('bg-slate-300', "text-black");
        }
    }

    return (
        <div className="mb-6 relative">
            <div className='bg-gray-200 p-2 rounded flex justify-between'>
                <h2 className="text-lg font-semibold">
                    Payment Links
                </h2>
                <button onClick={() => setActive(active === 6 ? null : 6)}><IoIosArrowDropdownCircle /></button>
            </div>
            <div className={`p-4 ${active === 6 ? "block" : "hidden"}`}>
                <form onSubmit={handleSubmit(submit)} className='w-full h-fit items-center justify-end flex flex-col rounded-full lg:px-60'>
                    <div className='flex w-fit'>
                        <button
                            type='button'
                            id='stripe'
                            onClick={() => handlePaymentMethod('stripe')}
                            className="bg-slate-300 md:text-nowrap hover:bg-violet-600 rounded-l-full active:bg-blue-300 hover:text-white text-black font-bold py-2 px-4 w-1/2"
                        >
                            Stripe Payment Link
                        </button>
                        <button
                            type='button'
                            id='flyremit'
                            onClick={() => handlePaymentMethod('flyremit')}
                            className="bg-slate-300 md:text-nowrap hover:bg-blue-600 rounded-r-full active:bg-blue-300 hover:text-white text-black font-bold py-2 px-4 w-1/2"
                        >
                            Flyremit Payment Link
                        </button>
                    </div>
                    <div className={`form my-2 font-semibold bg-gradient-to-l ${commision === 0 ? 'hidden' : 'grid'} grid-cols-2 gap-2 from-green-300 to-green-600 w-full h-fit rounded-2xl px-20 py-3 text-black items-center justify-around`}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className='col-span-2 p-4 bg-green-100 rounded-full'
                                >
                                    {agents.map((agent) =>
                                        (<option key={agent._id} value={agent.name}>{agent.name}</option>)
                                    )}
                                </select>
                            )}
                        />
                        {errors.name && <p className="text-red-600 col-span-2">{errors.name.message}</p>}
                        <input
                            type="email"
                            {...register('email')}
                            placeholder='Enter the email'
                            className='col-span-2 p-4 bg-green-100 border-none rounded-full'
                        />
                        {errors.email && <p className="text-red-600 col-span-2">{errors.email.message}</p>}

                        <Controller
                            control={control}
                            name="currency"
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className='col-span-1 p-4 bg-green-100 rounded-full'
                                >
                                    <option value="">Payment link currency</option>
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </select>
                            )}
                        />
                        {errors.currency && <p className="text-red-600 col-span-1">{errors.currency.message}</p>}

                        <Controller
                            control={control}
                            name="amount"
                            render={({ field }) => (
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder='Outstanding amount(USD)'
                                    className='col-span-1 p-4 bg-green-100 rounded-full'
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                                    value={field.value}
                                />
                            )}
                        />
                        {errors.amount && <p className="text-red-600 col-span-1">{errors.amount.message}</p>}

                        <Controller
                            control={control}
                            name="xerate"
                            render={({ field }) => (
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder='Enter the xerate'
                                    className='col-span-1 p-4 bg-green-100 rounded-full'
                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                                    value={field.value}
                                />
                            )}
                        />
                        {errors.xerate && <p className="text-red-600 col-span-1">{errors.xerate.message}</p>}

                        <input
                            type="number"
                            step="0.01"
                            value={`commision: ${commision}%`}
                            placeholder={`Commision: ${commision}%`}
                            disabled
                            className='col-span-1 p-4 bg-green-100 rounded-full'
                        />
                        <input type="hidden" {...register('commision', { valueAsNumber: true })} />
                    </div>
                    <div className={`${commision === 0 ? 'hidden' : 'flex'} font-bold justify-end w-full`}>
                        <button type='submit' className='bg-gradient-to-r w-1/5 from-green-700 to-green-900 hover:bg-green-900 text-white py-2 px-4 rounded'>Create</button>
                    </div>
                </form>
                <div className={`${commision === 0 ? 'flex flex-col' : 'hidden'} w-full`}>
                    {link.map((link, index) => (
                        <div className='my-2' key={index}>
                            <a href={link} target='_blank' rel='noopener noreferrer' className='text-sm bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded text-blue-400 hover:text-blue-700'>
                                Payment Link {index + 1}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PaymentAccordian