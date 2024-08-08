import React from 'react';
import { Skeleton } from 'antd';
import cn from 'classnames';
import { getColor } from '@/styles';

export default function TableSkeleton() {
	const columns = [1, 2, 3, 4, 5];
	const rows = [1, 2, 3, 4, 5, 6, 7, 8];

	return (
		<div className='p-4'>
			<div className='overflow-x-auto w-full'>
				<div className={cn(getColor('bg-bg-2'), getColor('border-bg-1'), 'min-w-fullborder shadow-sm rounded-lg')}>
					<div className={cn('min-w-full divide-y', getColor('divide-bg-bg-2'))}>
						<div className={getColor('bg-bg-4')}>
							<div className='flex items-center justify-between px-4 py-2'>
								{columns.map(col => (
									<Skeleton key={col} active className='w-full h-6' />
								))}
							</div>
						</div>
						{rows.map(row => (
							<div key={row} className='flex items-center justify-between px-4 py-2'>
								{columns.map(col => (
									<Skeleton key={col} active className='w-full h-6' />
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
