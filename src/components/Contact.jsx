import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'

const Contact = () => {
	const formRef = useRef()

	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	})

	const [loading, setLoading] = useState(false)

	const handleChange = e => {
		const { target } = e
		const { name, value } = target

		setForm({
			...form,
			[name]: value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		setLoading(true)

		emailjs
			.send(
				import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
				{
					from_name: form.name,
					to_name: 'Gerald Wang',
					from_email: form.email,
					to_email: 'wgeralt@outlook.com',
					message: form.message,
				},
				import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
			)
			.then(() => {
				setLoading(false)
				alert('Thank you. I will get back to you as soon as possible.')
				setForm({
					name: '',
					email: '',
					message: '',
				})
			})
			.catch(error => {
				setLoading(false)
				console.log(error)
				alert('Something went wrong.')
			})
	}

	return (
		<div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
			<motion.div className='flex-[0.75] bg-tertiary p-8 rounded-2xl' variants={slideIn('left', 'tween', 0.2, 1)}>
				<p className={styles.sectionSubText}>Get in touch</p>
				<h3 className={styles.sectionHeadText}>Contact.</h3>
				<form className='flex flex-col gap-8 mt-12' ref={formRef} onSubmit={handleSubmit} action=''>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>Your Name</span>
						<input
							className='bg-white py-4 px-6 placeholder:text-secondary text-tertiary rounded-lg outline-none border-none font-medium'
							type='text'
							name='name'
							value={form.name}
							onChange={handleChange}
							placeholder='What is your name?'
						/>
					</label>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>Your email</span>
						<input
							type='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder="What's your web address?"
							className='bg-white py-4 px-6 placeholder:text-secondary text-tertiary rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>Your Message</span>
						<textarea
							rows={7}
							name='message'
							value={form.message}
							onChange={handleChange}
							placeholder='What you want to say?'
							className='bg-white py-4 px-6 placeholder:text-secondary text-tertiary rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<button
						type='submit'
						className='bg-success py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-green-700 hover:shadow-lg hover:shadow-green-300 transition duration-300'
					>
						{loading ? 'Sending...' : 'Send'}
					</button>
				</form>
			</motion.div>
			<motion.div className='xl:flex-1 xl:h-auto md:h-[500px] h-[350px]' variants={slideIn('right', 'tween', 0.2, 1)}>
				<EarthCanvas />
			</motion.div>
		</div>
	)
}

export default SectionWrapper(Contact, 'contact')
