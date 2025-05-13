import React, { useState, useEffect } from 'react'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { BiDollarCircle, BiMailSend } from 'react-icons/bi'
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_URL } from '../../AppConstant'
import { fetchAgents, fetchPayLinks } from '../apiCalls/fetchData'
import { createPayLink } from '../apiCalls/createData'


function PaymentAccordian({ active, setActive, agent, tripId, disabled }) {
    const [stripe, setStripe] = useState(null);
    const [flyremit, setFlyremit] = useState(null);
    const [commision, setCommision] = useState(0);
    const [links, setLinks] = useState([]);
    const [isXeRateDisabled, setIsXeRateDisabled] = useState(false);

    const paymentSchema = z.object({
        agent_name: z.string().min(1, { message: "Name is required" }),
        agent_email: z.string().email({ message: "Valid email is required" }),
        currency: z.string().min(1, { message: "Currency is required" }),
        amount: z.number().positive({ message: "Amount must be positive" }),
        xerate: z.number().positive({ message: "XE Rate must be positive" }),
        commision: z.number()
    });

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            agent_name: '',
            agent_email: '',
            currency: '',
            amount: '',
            xerate: '',
            commision: 0
        }
    });

    // Watch the currency field to automatically set xerate when USD is selected
    const selectedCurrency = watch('currency');

    useEffect(() => {
        setStripe(document.querySelector('#stripe'));
        setFlyremit(document.querySelector('#flyremit'));
        (async () => {
            const linksData = await fetchPayLinks(tripId)
            console.log(linksData)
            setLinks(linksData)
        })()
    }, []);

    useEffect(() => {
        setValue('commision', commision);
        setValue('agent_name', agent);
    }, [commision, setValue, agent]);

    // Add effect to set xerate to 1 when currency is USD
    useEffect(() => {
        if (selectedCurrency === 'USD') {
            setValue('xerate', 1);
            setIsXeRateDisabled(true);
        } else {
            setIsXeRateDisabled(false);
        }
    }, [selectedCurrency, setValue]);

    const submit = async (data) => {
        Swal.fire({
            title: 'Create Payment Links?',
            text: `You are about to create a payment links of ${((data.amount * data.xerate) + (data.amount * data.xerate) * (commision / 100)).toFixed(2)} ${data.currency}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Create Links',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            background: 'rgba(255, 255, 255, 0.9)',
            backdrop: 'rgba(0,0,0,0.4)',
            customClass: {
                title: 'text-lg font-bold text-gray-800',
                popup: 'rounded-xl border border-gray-200 shadow-xl'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await createPayLink(data, tripId);
                    console.log(response);
                    setLinks([...links, response]);
                    setCommision(0);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Payment links created successfully',
                        icon: 'success',
                        confirmButtonColor: '#10b981',
                        timer: 2000
                    });

                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: error || 'Failed to create payment links',
                        icon: 'error',
                        confirmButtonColor: '#ef4444'
                    });
                }
            }
        });
    }

    const handlePaymentMethod = (method) => {
        if (method === 'stripe') {
            setCommision(5);
            stripe?.classList.add('bg-violet-600', "text-white");
            stripe?.classList.remove('bg-slate-300', "text-black");
            flyremit?.classList.remove('bg-blue-700', "text-white");
            flyremit?.classList.add('bg-slate-300', "text-black");
        } else {
            setCommision(1.5);
            flyremit?.classList.add('bg-blue-700', "text-white");
            flyremit?.classList.remove('bg-slate-300');
            stripe?.classList.remove('bg-violet-600', "text-white");
            stripe?.classList.add('bg-slate-300', "text-black");
        }
    }

    return (
        <div className={`mb-6 relative`}>
            <div className='bg-gradient-to-r from-yellow-100 to-yellow-300 text-black p-3 rounded-lg flex justify-between items-center shadow-md'>
                <h2 className="text-lg font-bold text-black flex items-center gap-2">
                    <FaCreditCard />
                    Payment Links
                </h2>
                <button
                    disabled={disabled}
                    onClick={() => setActive(active === 6 ? null : 6)}
                    className="text-black hover:text-yellow-300 transition-colors duration-300"
                >
                    <IoIosArrowDropdownCircle size={24} />
                </button>
            </div>

            <div className={`p-4 ${active === 6 ? "block" : "hidden"} bg-gradient-to-b from-slate-200 to-slate-400 rounded-b-lg shadow-inner`}>
                <form onSubmit={handleSubmit(submit)} className='w-full h-fit items-center justify-end flex flex-col rounded-xl lg:px-60'>
                    <div className='flex w-fit gap-1 mb-4'>
                        <button
                            type='button'
                            id='stripe'
                            onClick={() => handlePaymentMethod('stripe')}
                            className="bg-slate-200 md:text-nowrap hover:bg-violet-600 rounded-l-full active:bg-violet-700 hover:text-white text-black font-bold py-3 px-6 w-1/2 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                        >
                            <FaCreditCard /> Stripe
                        </button>
                        <button
                            type='button'
                            id='flyremit'
                            onClick={() => handlePaymentMethod('flyremit')}
                            className="bg-slate-200 md:text-nowrap hover:bg-blue-600 rounded-r-full active:bg-blue-800 hover:text-white text-black font-bold py-3 px-6 w-1/2 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                        >
                            <FaMoneyBillWave /> Flyremit
                        </button>
                    </div>

                    <div className={`form my-4 font-medium ${commision === 0 ? 'hidden' : 'grid'} grid-cols-2 gap-4 w-full h-fit rounded-xl px-8 py-6 text-black items-center justify-around bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 shadow-lg border border-emerald-200`}>
                        <div className="col-span-2 relative">
                            <input
                                type="text"
                                value={agent || ''}
                                disabled
                                placeholder='Agent name'
                                className='w-full p-4 bg-white/80 border border-emerald-200 rounded-xl shadow-inner'
                            />
                            <input
                                type="hidden"
                                {...register('agent_name')}
                            />
                        </div>

                        <div className="col-span-2 relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-600">
                                <BiMailSend size={20} />
                            </div>
                            <input
                                type="email"
                                {...register('agent_email')}
                                placeholder='Customer email address'
                                className='w-full p-4 pl-10 bg-white/80 border border-emerald-200 rounded-xl shadow-inner focus:ring-2 focus:ring-emerald-300 focus:border-transparent outline-none transition-all'
                            />
                        </div>
                        {errors.agent_email && <p className="text-red-600 col-span-2 text-sm ml-2">* {errors.agent_email.message}</p>}

                        <div className="col-span-1 relative">
                            <Controller
                                control={control}
                                name="currency"
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className='w-full p-4 bg-white/80 border border-emerald-200 rounded-xl shadow-inner appearance-none cursor-pointer focus:ring-2 focus:ring-emerald-300 focus:border-transparent outline-none transition-all'
                                    >
                                        <option value="">Select currency</option>
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="INR">INR - Indian Rupee</option>
                                    </select>
                                )}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-emerald-600">
                                <BiDollarCircle size={20} />
                            </div>
                        </div>
                        {errors.currency && <p className="text-red-600 col-span-1 text-sm ml-2">* {errors.currency.message}</p>}

                        <div className="col-span-1 relative">
                            <Controller
                                control={control}
                                name="amount"
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder='Amount (USD)'
                                        className='w-full p-4 bg-white/80 border border-emerald-200 rounded-xl shadow-inner focus:ring-2 focus:ring-emerald-300 focus:border-transparent outline-none transition-all'
                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                                        value={field.value}
                                    />
                                )}
                            />
                        </div>
                        {errors.amount && <p className="text-red-600 col-span-1 text-sm ml-2">* {errors.amount.message}</p>}

                        <div className="col-span-1 relative">
                            <Controller
                                control={control}
                                name="xerate"
                                render={({ field }) => (
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder='Exchange rate'
                                        className={`w-full p-4 bg-white/80 border border-emerald-200 rounded-xl shadow-inner focus:ring-2 focus:ring-emerald-300 focus:border-transparent outline-none transition-all ${isXeRateDisabled ? 'bg-gray-100' : ''}`}
                                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : '')}
                                        value={field.value}
                                        disabled={isXeRateDisabled}
                                    />
                                )}
                            />
                            {isXeRateDisabled && (
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                                    Auto-set for USD
                                </div>
                            )}
                        </div>
                        {errors.xerate && <p className="text-red-600 col-span-1 text-sm ml-2">* {errors.xerate.message}</p>}

                        <div className="col-span-2 bg-gradient-to-r from-indigo-100 to-purple-100 p-3 rounded-xl flex items-center mt-2">
                            <div className="text-indigo-800 font-semibold">
                                Commission Rate: <span className="text-purple-700">{commision}%</span>
                            </div>
                            <input type="hidden" {...register('commision', { valueAsNumber: true })} />
                        </div>

                        <div className="col-span-2 mt-4 flex justify-end">
                            <button
                                type='submit'
                                className='bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2'
                            >
                                <span>Generate Links</span> <FaCreditCard />
                            </button>
                        </div>
                    </div>
                </form>

                <div className={`${commision === 0 ? 'block' : 'hidden'} w-full`}>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl shadow-md border border-indigo-100">
                        <h3 className="text-lg font-semibold text-indigo-800 mb-4">Available Payment Linkss</h3>
                        {links.length > 0 ? (
                            <div className="space-y-3">
                                {links.map((link, index) => (
                                    <div className='flex items-center overflow-hidden' key={index}>
                                        <FaCreditCard className="text-indigo-500 mr-3" />
                                        <a
                                            href={link.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='bg-white py-2 px-4 flex justify-around rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-colors duration-300 shadow-sm border border-indigo-100 flex-grow'
                                        >
                                            <p>Payment Link {link.link} </p>
                                            <p>amount {((link.amount * link.xerate) + (link.amount * link.xerate) * (link.commision / 100)).toFixed(2)}</p>
                                            <p>currency: {link.currency}</p>
                                            <p>Xerate: {link.xerate}</p>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No payment linkss available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentAccordian