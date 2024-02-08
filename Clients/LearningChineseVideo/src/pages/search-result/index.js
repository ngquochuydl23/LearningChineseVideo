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
	return (
		<div>
			<Head>
				<title>
					Tìm kiếm
				</title>
			</Head>
			<Box>


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
