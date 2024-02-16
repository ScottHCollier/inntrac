import Input from './custom/input';

const Search = () => {
  return (
    <div>
      <Input
        type='search'
        placeholder='Search...'
        className='md:w-[100px] lg:w-[300px]'
        name={'search'}
        onChange={() => console.log('test')}
        fieldName={'search'}
      />
    </div>
  );
};

export default Search;
