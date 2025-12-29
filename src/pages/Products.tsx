import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchProducts } from '../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import { testData } from './ProductTestData';
import TransactionFilters from '../components/TransactionFilters';
import TransactionHeader from '../components/transaction/TransactionHeader';
import VerificationSummary from '../components/transaction/VerificationSummary';
import UploadedDocuments from '../components/transaction/UploadedDocuments';
import ActionButtons from '../components/transaction/ActionButtons';
import ActivityLog from '../components/transaction/ActivityLog';

const Products = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ['allproducts'],
    queryFn: fetchProducts,
  });
  console.log("data===>", data);

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'txnId',
      headerName: 'TNX ID',
      minWidth: 60,
      flex: 1,
    },
    {
      field: 'dateTime',
      type: 'string',
      headerName: 'Date/Time',
      minWidth: 120,
      flex: 1.4
    },
    {
      field: 'passenger',
      type: 'string',
      headerName: 'Passenger',
      minWidth: 60,
      flex: 1,
    },
    {
      field: 'docType',
      headerName: 'Doctype',
      type: 'string',
      minWidth: 60,
      flex: 1,
    },
    {
      field: 'nationality',
      headerName: 'Nationality',
      minWidth: 60,
      type: 'string',
      flex: 1,
    },
    {
      field: 'fromTo',
      headerName: 'Form → To',
      minWidth: 60,
      type: 'string',
      flex: 1,
    },
    {
      field: 'mode',
      headerName: 'Mode',
      minWidth: 60,
      type: 'string',
      flex: .4,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 60,
      type: 'string',
      flex: .8,
    },
    {
      field: 'travelStatus',
      headerName: 'Travel Status',
      minWidth: 60,
      type: 'string',
      flex: 1,
    },
    {
      field: 'docsUploaded',
      headerName: 'Docs Uploaded',
      minWidth: 120,
      flex: 1.2,
      sortable: false,
      renderCell: (params) => {
        const count = params.value;

        return (
          <span
            onClick={() => {
              console.log('Docs clicked', params.row);
            }}
            style={{
              color: '#dc2626',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            {count} docs
          </span>

        );
      },
    },
    {
      field: 'view',
      headerName: '',
      sortable: false,
      filterable: false,
      minWidth: 80,
      flex: .5,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              console.log('View clicked → row:', params.row);
              // navigate(`/transactions/${params.row.id}`);
            }}
            className="px-4 py-1 border border-gray-300 rounded-md text-sm font-medium
                   text-gray-800 bg-white hover:bg-gray-100
                   transition-all duration-200"
          >
            View
          </button>
        );
      },
    }

  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'promiseProducts' });
    }
    if (isError) {
      toast.error('Error while getting the data!', {
        id: 'promiseProducts',
      });
    }
    if (isSuccess) {
      toast.success('Got the data successfully!', {
        id: 'promiseProducts',
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-xl xl:text-2xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Transactions
            </h2>
          </div>
        </div>
        <TransactionFilters
          onApply={(filters) => {
            console.log("Applied Filters 👉", filters);
            // call API here
          }}
        />

        {isLoading ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={[]}
            isCheckboxSelection={false}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={testData}
            isCheckboxSelection={false}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="products"
              columns={columns}
              rows={[]}
              isCheckboxSelection={false}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}


        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <TransactionHeader />

          <div className="grid grid-cols-3 gap-4">
            <VerificationSummary />
            <UploadedDocuments />
            <div className="space-y-3">
              <ActionButtons />
              <ActivityLog />
            </div>
          </div>
        </div>

        {isOpen && (
          <AddData
            slug={'product'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
