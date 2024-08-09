'use client';
import { Switch } from 'antd';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function HeaderSwitch() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	const toggleTheme = () => {
		if (theme === 'dark') setTheme('light');
		else setTheme('dark');
	};

	return (
		<Switch
			className='ml-4'
			checked={theme === 'dark'}
			onChange={toggleTheme}
			checkedChildren='Dark'
			unCheckedChildren='Light'
		/>
	);
}
