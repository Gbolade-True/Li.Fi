import { useState } from 'react';
import { Input, Space, Typography, Select } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CloseOutlined } from '@ant-design/icons';

type FilterFieldType = 'text' | 'number' | 'select';

export interface IBaseFilters {
	pageNumber?: number;
	pageSize?: number;
}

export type FilterField<F> = {
	name: keyof F;
	label: string;
	type: FilterFieldType;
	options?: { value: string | number; label?: string }[];
	placeholder?: string;
	defaultValue?: string | number | null;
	infoText?: string;
};

interface FilterProps<F> {
	onFilterChange: (filters: F) => void;
	filterFields: FilterField<F>[];
}

export const Filter = <F extends { [key: string]: any }>({ onFilterChange, filterFields = [] }: FilterProps<F>) => {
	const [filters, setFilters] = useState<F>({} as F);

	const handleFilterChange = (name: keyof F, type: FilterFieldType, value: any) => {
		let new_filters = { ...filters };
		if (type === 'select') {
			filterFields.forEach(f => {
				if (f.type !== 'select') {
					delete new_filters[f.name];
				}
			});
		}
		new_filters[name] = value;
		onFilterChange(new_filters);
		setFilters(new_filters);
	};

	return (
		<Space wrap className='w-full' align='end'>
			{filterFields.map(fI => {
				const { name, label, type, options, defaultValue, placeholder } = fI;
				return (
					<Space key={name as string} direction='vertical' className='w-full'>
						<Typography>{label}</Typography>
						{type === 'select' && (
							<Select
								id={String(name)}
								options={options || []}
								placeholder={placeholder}
								value={filters?.[name] || defaultValue || ''}
								onChange={value => handleFilterChange(name, type, value)}
								className='w-[120px] md:w-[250px]'
							/>
						)}
						{(type === 'text' || type === 'number') && (
							<Input
								id={String(name)}
								name={String(name)}
								type={type}
								placeholder={placeholder}
								value={filters?.[name] || defaultValue || ''}
								onChange={e => handleFilterChange(name, type, e.target.value)}
								addonAfter={<CloseOutlined key={name as string} onClick={() => handleFilterChange(name, type, '')} />}
								className='w-[120px] md:!w-[250px]'
							/>
						)}
					</Space>
				);
			})}
		</Space>
	);
};
