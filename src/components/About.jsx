import React from 'react'
import { SectionWrapper } from '../hoc'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ServiceCard = ({ index, title, icon }) => {
	return (
		<Tilt className='xs:w-[250px] w-full'>
			<motion.div
				className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
				variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
			>
				<div
					className='flex justify-evenly items-center flex-col bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px]'
					options={{
						max: 45,
						scale: 1,
						speed: 450,
					}}
				>
					<img className='w-16 h-16 object-contain' src={icon} alt={title} />
					<h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
				</div>
			</motion.div>
		</Tilt>
	)
}

const About = () => {
	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={styles.sectionSubText}>Introduction</p>
				<h2 className={styles.sectionHeadText}>Overview.</h2>
			</motion.div>
			<motion.p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]' variants={fadeIn('', '', 0.1, 1)}>
				I'm a skilled software developer with experience in TypeScript and JavaScript, and expertise in frameworks like
				React, Node.js, and Three.js. I'm a quick learner and collaborate closely with clients to create efficient,
				scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to
				life!
			</motion.p>
			<div className='mt-20 flex flex-wrap gap-10'>
				{services.map((service, index) => (
					<ServiceCard key={service.title} index={index} {...service} />
				))}
			</div>
		</>
	)
}

export default SectionWrapper(About, 'about')
