import React from 'react';
import FileItem from './FileItem';
import EmptyList from './EmptyList';

const FileList = (data) =>
  !data.length ? (
    <EmptyList />
  ) : (
    data.map((value, index) => <FileItem item={value} key={String(index)} />)
  );

export default FileList;
