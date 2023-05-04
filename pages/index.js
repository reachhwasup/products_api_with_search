
import { Inter } from 'next/font/google'
import Layout from './../components/layout';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [product, setProduct] = useState([])
  const [search , setSearch] = useState(" ");
  const [filterProducts ,setFilterProducts] = useState([]);
  
  const getProducts = async () => {
         const resp = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
        setProduct(resp.data)
        setFilterProducts(resp.data)
        
  }
  useEffect(() => {
      getProducts();
  },[])

  useEffect(() => {
      const result = product.filter(products => {
        return products.title.toLowerCase().match(search.toLowerCase());
      });
      setFilterProducts(result);
  },[search])
  const columns= [
    {
        name: "Product Name",
        selector: row => row.title,
        sortable: true,
    },
    {
        name: "Products Price",
        selector: row => row.price,
        sortable : true
    },
    {
      name: "Category",
      selector: row => row.category.name,
  },
    {
        name: "Pictures",
        selector: row => <img src={row.images} width={80} style={{'margin':'10px'}}/>
        ,
    },
    {
        name: "Action",
        cell: (row) =>  
        <div>
        <button className='btn btn-warning m-2'>Edit</button>
        <button className='btn btn-danger' >Delete</button>
        </div>,
      }

]
  return (
      <Layout className='bg-white'>
        <main className='container bg-light '>
        <h1> Products</h1>
        <DataTable
        title='List of All Products'
        columns={columns}
        data={filterProducts}
        fixedHeader
        fixedHeaderScrollHeight='500px'
        subHeader
        pagination

        subHeaderComponent={
          <input type='text'
           placeholder='Search Here'
            className='form-control w-25'
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        }
        />
        <ToastContainer/>
        </main>
      </Layout>
  )
}