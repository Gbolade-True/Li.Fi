'use client';
import { Col, Row } from 'antd';
import Text from 'antd/es/typography/Text';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { getColor } from '@/styles';

interface GoToProps {
	route?: string;
}

export const GoTo = ({ route }: GoToProps) => {
	const router = useRouter();
	return (
		<Row gutter={16} className='items-center mb-4'>
			<Col span={24}>
				<Text
					strong
					onClick={() => (route ? router.push(route) : router.back())}
					className={cn(getColor('text-text-4'), 'cursor-pointer', `hover: ${getColor('text-text4_')}`)}
				>
					<ArrowLeftOutlined />
					Back
				</Text>
			</Col>
		</Row>
	);
};
