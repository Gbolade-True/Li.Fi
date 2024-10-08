import React from 'react';
import { Skeleton } from 'antd';
import cn from 'classnames';
import { getColor } from '@/styles';
import SkeletonInput from 'antd/es/skeleton/Input';

export default function TableSkeleton() {
	const items = [1, 2, 3, 4];

	return (
		<div className='p-4'>
			<div className='flex items-center gap-2 my-2'>
				<SkeletonInput className='w-60' />
				<SkeletonInput className='w-60' />
			</div>
			<div className='overflow-x-auto w-full'>
				<div className={cn(getColor('bg-bg-2'), getColor('border-bg-1'), 'min-w-fullborder shadow-sm rounded-lg')}>
					<div className={cn('min-w-full divide-y', getColor('divide-bg-bg-2'))}>
						<div className={getColor('bg-bg-4')}>
							<div className='flex items-center'>
								{items.map(col => (
									<Skeleton key={`col_${col}`} active className='w-full h-2' />
								))}
							</div>
						</div>
						{items.map(row => (
							<Skeleton key={`row_${row}`} active className='w-full h-2' />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
