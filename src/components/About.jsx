import React from 'react'
import { SectionWrapper } from '../hoc'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { useTranslation, Trans } from 'react-i18next'

const ServiceCard = ({ index, title, icon }) => {
	return (
		<Tilt className='xs:w-[250px] w-full'>
			<motion.div
				className='bg-gradient-to-r from-[#0597F2] to-[#035AA6] p-[1px] rounded-[20px] shadow-card'
				variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
			>
				<div
					className='flex justify-evenly items-center flex-col rounded-[20px] py-5 px-12 min-h-[280px]'
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
	const { t } = useTranslation();

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={styles.sectionSubText}>{t("introduction.title")}</p>
				<h2 className={styles.sectionHeadText}>{t("introduction.subtitle")}.</h2>
			</motion.div>
			<motion.p className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]' variants={fadeIn('', '', 0.1, 1)}>
				<Trans i18nKey="introduction.content" />
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
