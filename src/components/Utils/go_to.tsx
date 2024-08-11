'use client';
import { Col, Row } from 'antd';
import Text from 'antd/es/typography/Text';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { getColor } from '@/styles';

interface GoToProps {
	route?: string;
	referer?: string | null;
	searchParams?: { [key: string]: any };
}

export const GoTo = ({ route, referer, searchParams }: GoToProps) => {
	const router = useRouter();
	const handleClick = () => {
		let url = {} as URL;
		if (!route && !referer) {
			return router.back();
		}
		if (referer) url = new URL(referer);
		if (route) url = new URL(route);

		if (searchParams) {
			Object.keys(searchParams).forEach(key => url.searchParams.append(key, searchParams[key]));
		}

		return router.push(url.href);
	};
	return (
		<Row gutter={16} className='items-center mb-4'>
			<Col span={24}>
				<Text
					strong
					onClick={handleClick}
					className={cn(getColor('text-text-4'), 'cursor-pointer', `hover: ${getColor('text-text4_')}`)}
				>
					<ArrowLeftOutlined />
					Back
				</Text>
			</Col>
		</Row>
	);
};
