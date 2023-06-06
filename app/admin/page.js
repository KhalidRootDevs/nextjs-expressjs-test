'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
   const router = useRouter();

   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm({
      mode: 'onTouched'
   });

   const SignUp = async (email, password) => {
      console.log(email, password);
      const response = await fetch('http://localhost:3000/api/v1/signin', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
         },
         body: JSON.stringify(email, password)
      });
      const userData = await response.json();
      console.log('Inside Login', userData);
      if (response.status === 200) {
         router.push('/admin/dashboard');
      } else {
         toast.error(userData.message);
      }
   };

   return (
      <div className='flex items-center justify-center min-h-screen'>
         <div className='bg-white p-5 rounded-lg shadow-md w-full sm:w-[400px] lg:w-[500px] m-4 lg:m-0'>
            <h4 className='text-3xl text-center p-2 mb-4 font-semibold text-gray-800 border-b border-gray-300'>
               Admin Login
            </h4>
            <form className='mt-5' onSubmit={handleSubmit(SignUp)}>
               <div className='mb-2'>
                  <input
                     type='email'
                     placeholder='Email'
                     className='block w-full px-4 py-2 mt-2 text-green-500 bg-white border rounded-md focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40'
                     {...register('email', {
                        required: {
                           value: true,
                           message: 'Please Enter Your Email'
                        },
                        pattern: {
                           value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                           message: 'Enter a valid Email'
                        }
                     })}
                  />
                  <label className='pt-1 pl-2'>
                     {errors.email?.type === 'required' && (
                        <span className='text-base font-semibold text-red-400'>
                           {errors.email.message}
                        </span>
                     )}
                     {errors.email?.type === 'pattern' && (
                        <span className='text-base font-semibold text-red-400'>
                           {errors.email.message}
                        </span>
                     )}
                  </label>
               </div>
               <div className='mb-2'>
                  <input
                     type='password'
                     placeholder='Password'
                     className='block w-full px-4 py-2 mt-1 text-green-500 bg-white border rounded-md focus:border-green-500 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-40'
                     {...register('password', {
                        required: {
                           value: true,
                           message: 'Please Enter Your Password'
                        },
                        minLength: {
                           value: 6,
                           message: 'At least 6 digit'
                        }
                     })}
                  />
                  <label className='pt-1 pl-2'>
                     {errors.password?.type === 'required' && (
                        <span className='text-base font-semibold text-red-400'>
                           {errors.password.message}
                        </span>
                     )}
                     {errors.password?.type === 'minLength' && (
                        <span className='text-base font-semibold text-red-400'>
                           {errors.password.message}
                        </span>
                     )}
                  </label>
               </div>
               <button
                  type='submit'
                  className='w-full uppercase font-semibold text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-2 focus:outline-none focus:ring-green-500 rounded-lg text-lg px-5 py-2 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-500 transition-all ease-in duration-150'
               >
                  Login
               </button>
            </form>
         </div>
         <Toaster />
      </div>
   );
}
