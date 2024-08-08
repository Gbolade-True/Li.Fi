import React from 'react';
import { Alert, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ErrorComponentProps {
	message?: string;
	description?: string;
	onRetry?: () => void;
}
export const ErrorComponent = ({ message, description, onRetry }: ErrorComponentProps) => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='max-w-lg w-full'>
				<Alert
					message={message || 'Something went wrong'}
					description={description || 'An unexpected error occurred. Please try again later.'}
					type='error'
					showIcon
					icon={<ExclamationCircleOutlined />}
					action={
						onRetry && (
							<Button type='primary' size='small' onClick={onRetry}>
								Retry
							</Button>
						)
					}
				/>
			</div>
		</div>
	);
};
