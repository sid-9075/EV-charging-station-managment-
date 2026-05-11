import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeForm, createStation, fetchStations, fetchSummary, updateStation } from '../../store/slices/stationSlice';
import type { StationFormData } from '../../types/station';

const URL_REGEX = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
const PIN_REGEX = /^\d{6}$/;

const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors";
const labelClass = "block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide";
const errorClass = "text-xs text-red-400 mt-1";

const StationForm = () => {
    const dispatch = useAppDispatch();
    const { isFormOpen, formMode, selectedStation, currentPage, pageSize, searchQuery, statusFilter } = useAppSelector((s) => s.stations);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StationFormData>({
        defaultValues: { status: 0, connectorType: 0 },
    });

    useEffect(() => {
        if (formMode === 'edit' && selectedStation) {
            const connectorMap: Record<string, number> = { CCS: 0, Type2: 1, CHAdeMO: 2, GB_T: 3 };
            const statusMap: Record<string, number> = { Operational: 0, Maintenance: 1, Inactive: 2 };
            reset({
                name: selectedStation.name,
                locationAddress: selectedStation.locationAddress,
                pinCode: selectedStation.pinCode,
                connectorType: connectorMap[selectedStation.connectorType] ?? 0,
                status: statusMap[selectedStation.status] ?? 0,
                imageUrl: selectedStation.imageUrl ?? '',
                locationLink: selectedStation.locationLink ?? '',
            });
        } else {
            reset({ name: '', locationAddress: '', pinCode: '', connectorType: 0, status: 0, imageUrl: '', locationLink: '' });
        }
    }, [formMode, selectedStation, reset]);

    const onSubmit = async (data: StationFormData) => {
        const payload = {
            ...data,
            connectorType: Number(data.connectorType),
            status: Number(data.status),
            imageUrl: data.imageUrl || undefined,
            locationLink: data.locationLink || undefined,
        };

        const result = formMode === 'create'
            ? await dispatch(createStation(payload))
            : await dispatch(updateStation({ id: selectedStation!.id, dto: payload }));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success(formMode === 'create' ? 'Station created!' : 'Station updated!');
            dispatch(fetchStations({ page: currentPage, pageSize, search: searchQuery, status: statusFilter }));
            dispatch(fetchSummary());
        } else {
            toast.error((result.payload as string) || 'Something went wrong');
        }
    };

    if (!isFormOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white">
                        {formMode === 'create' ? 'Add New Station' : 'Edit Station'}
                    </h2>
                    <button onClick={() => dispatch(closeForm())} className="text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className={labelClass}>Station Name *</label>
                        <input className={inputClass} placeholder="e.g. Pune Central Hub"
                            {...register('name', { required: 'Name is required', maxLength: { value: 100, message: 'Max 100 characters' } })} />
                        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className={labelClass}>Location Address *</label>
                        <input className={inputClass} placeholder="e.g. MG Road, Pune"
                            {...register('locationAddress', { required: 'Address is required', maxLength: { value: 250, message: 'Max 250 characters' } })} />
                        {errors.locationAddress && <p className={errorClass}>{errors.locationAddress.message}</p>}
                    </div>

                    {/* Pin Code */}
                    <div>
                        <label className={labelClass}>Pin Code *</label>
                        <input className={inputClass} placeholder="e.g. 411001"
                            {...register('pinCode', { required: 'Pin code is required', pattern: { value: PIN_REGEX, message: 'Must be exactly 6 digits' } })} />
                        {errors.pinCode && <p className={errorClass}>{errors.pinCode.message}</p>}
                    </div>

                    {/* Connector + Status row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Connector Type *</label>
                            <select className={inputClass} {...register('connectorType', { required: true })}>
                                <option value={0}>CCS</option>
                                <option value={1}>Type 2</option>
                                <option value={2}>CHAdeMO</option>
                                <option value={3}>GB/T</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Status *</label>
                            <select className={inputClass} {...register('status', { required: true })}>
                                <option value={0}>Operational</option>
                                <option value={1}>Maintenance</option>
                                <option value={2}>Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className={labelClass}>Image URL</label>
                        <input className={inputClass} placeholder="https://..."
                            {...register('imageUrl', {
                                validate: v => !v || URL_REGEX.test(v) || 'Must be a valid URL'
                            })} />
                        {errors.imageUrl && <p className={errorClass}>{errors.imageUrl.message}</p>}
                    </div>

                    {/* Location Link */}
                    <div>
                        <label className={labelClass}>Google Maps Link</label>
                        <input className={inputClass} placeholder="https://maps.google.com/..."
                            {...register('locationLink', {
                                validate: v => !v || URL_REGEX.test(v) || 'Must be a valid URL'
                            })} />
                        {errors.locationLink && <p className={errorClass}>{errors.locationLink.message}</p>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={() => dispatch(closeForm())}
                            className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 text-sm font-medium transition-all">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting}
                            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                            {isSubmitting ? 'Saving...' : formMode === 'create' ? 'Create Station' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StationForm;