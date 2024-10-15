import AsyncSelect from 'react-select/async';

// Fungsi untuk memfilter data berdasarkan input pengguna
const filterData = (inputValue, data) => {
  return data.filter((person) =>
    person.name.toLowerCase().replace(/\s+/g, '').includes(inputValue.toLowerCase().replace(/\s+/g, ''))
  );
};


const loadOptions = (inputValue, callback, data) => {
  setTimeout(() => {
    callback(filterData(inputValue, data));
  }, 1000); 
};

export default function Selector({ data, selected, setSelected, placeholder, formik, name }) {
  return (
    <div className="max-w-lg">
      <AsyncSelect
        cacheOptions
        defaultOptions={data} 
        loadOptions={(inputValue, callback) => loadOptions(inputValue, callback, data)}
        getOptionLabel={(person) => person.name} 
        getOptionValue={(person) => person.id} 
        value={selected} 
        onChange={(value) => {
          setSelected(value);
          formik.setFieldValue(name, value ? value.name: ''); 
        }}
        placeholder={placeholder}
        classNamePrefix="react-select" 
        noOptionsMessage={() => 'Tidak ada hasil yang ditemukan'}
        isClearable

        styles={{
          control: (provided, state) => ({
            ...provided,
            borderRadius: '0', 
            boxShadow: state.isFocused ? '0 0 0 0.1rem rgba(251, 146, 60, 0.25)' : 'none', 
            borderColor: state.isFocused ? '#FB923C' : '#E5E7EB', 
            '&:hover': {
              borderColor: '#FB923C', 
            },
            placeholder: (provided) => ({
              ...provided,
              color: '#A1A1A1', 
            }),
          })
        }}
      />
    </div>
  );
}
