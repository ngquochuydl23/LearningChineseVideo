import Head from 'next/head';
import {
	Box,
	Container,
	Stack,
	Typography,
	Unstable_Grid2 as Grid,
	Button
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import { getProducts } from 'src/services/api/video-api';
import AddIcon from '@mui/icons-material/Add';

const Page = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts()
			.then((res) => setProducts(res))
			.catch((err) => console.log(err))
	}, [])


	return (
		<div>
			<Head>
				<title>
					Products
				</title>
			</Head>
			<Box
				component="main"
				sx={{ flexGrow: 1 }}>


			</Box>
		</div>
	)
}

Page.getLayout = (page) => (
	<DashboardLayout>
		{page}
	</DashboardLayout>
);

export default Page;
