jest.mock('antd', () => {
	return {
		...jest.requireActual('antd'),
		theme: {
			defaultAlgorithm: jest.fn(), // Mock function if needed, or use a stub
			darkAlgorithm: jest.fn(), // Mock function if needed, or use a stub
			compactAlgorithm: jest.fn(), // Mock function if needed, or use a stub
			getDesignToken: jest.fn(() => ({})), // Mock function if needed, or use a stub
			defaultSeed: {}, // Mock an empty or sample seed token object
			useToken: jest.fn() // Mock function if needed, or use a stub
		},
		Row: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
		Col: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
		Card: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
		Layout: jest.fn(({ children }: any) => <div>{children}</div>),
		Header: jest.fn(({ children }: any) => <div>{children}</div>),
		Drawer: jest.fn(({ children }: any) => <div>{children}</div>),
		Avatar: jest.fn((props: any) => <div {...props} />),
		Title: jest.fn(({ children }: any) => <div>{children}</div>),
		Text: jest.fn(({ children }: any) => <div>{children}</div>),
		Typography: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
		Space: jest.fn(({ children }: any) => <div>{children}</div>),
		Switch: jest.fn(({ children }: any) => <div>{children}</div>),
		Input: jest.fn(({ children }: any) => <div>{children}</div>),
		Select: jest.fn(({ children }: any) => <div>{children}</div>),
		Skeleton: jest.fn(({ children }: any) => <div>{children}</div>),
		SkeletonNode: jest.fn(({ children }: any) => <div>{children}</div>),
		AntdRegistry: jest.fn((props: any) => <div {...props} />),
		ConfigProvider: jest.fn((props: any) => <div {...props} />),
		Button: jest.fn(({ icon, onClick, 'data-testid': dataTestId, ...props }: any) => (
			<button onClick={onClick} data-testid={dataTestId} {...props}>
				{props.children}
			</button>
		)),
		Table: jest.fn(({ columns, dataSource, ...props }: any) => (
			<div data-testid='mock-table'>
				{/* Render column headers */}
				<div data-testid='mock-table-columns'>
					{columns?.map((col: any) => (
						<div key={col.key || col.dataIndex} data-testid={`mock-column-${col.key || col.dataIndex}`}>
							{col.title}
						</div>
					))}
				</div>
				{/* Render rows */}
				<div data-testid='mock-table-rows'>
					{dataSource?.map((data: any, index: number) => (
						<div key={data.key || index} data-testid={`mock-row-${data.key || index}`}>
							{columns?.map((col: any) => {
								const key = col.key || col.dataIndex;
								return (
									<div key={col.key || col.dataIndex} data-testid={`mock-cell-${key}`}>
										{col.render ? col.render(data[key], data) : data[key]}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		))
	};
});
