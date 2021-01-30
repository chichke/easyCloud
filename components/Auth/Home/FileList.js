import React from 'react';
import FileItem from './FileItem';

const FileList = (data) =>
  data.map((value, index) => <FileItem item={value} key={String(index)} />);

export default FileList;
