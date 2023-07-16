// ----------------------------------------------------------------------

export default function getFileData(file, index) {
  if (typeof file === 'string') {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file,
    };
  }

  return {
    key: index ? `${file.name ?? file.originalName}-${index}` : file.name ?? file.originalName,
    name: file.name ?? file.originalName,
    size: file.size,
    path: file.path,
    type: file.type,
    preview: file.preview,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    status: file.status,
    created_at: file.created_at,
  };
}
