import React from 'react';
import { fetchProducts } from '../api/ApiCollection';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import TransactionFilters from '../components/TransactionFilters';
import WorkloadSummary from '../components/pending/WorkloadSummary';
import PendingItemsList from '../components/pending/PendingItemsList';

const Pending = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['allproducts'],
        queryFn: fetchProducts,
    });


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
                <div className="w-full flex justify-between xl:mb-3 ">
                    <div className="flex gap-1 justify-start flex-col items-start">
                        <h1 className="text-base sm:text-lg font-semibold text-primary">
                            Pending Approvals
                        </h1>
                    </div>
                </div>

                <div className="min-h-screen p-0 space-y-6">
                    <WorkloadSummary />
                    <PendingItemsList />
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

export default Pending;
