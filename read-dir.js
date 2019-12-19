  getFileNamesForDir = ({
    dir,
    fileList = [],
  }) => {
    const allFiles = fs.readdirSync(dir);

    // eslint-disable-next-line no-param-reassign
    if (dir[dir.length - 1] !== '/') dir = dir.concat('/');

    allFiles.forEach(
      cur => {
        if (fs.statSync(`${dir}/${cur}`).isDirectory()) {
          // eslint-disable-next-line no-param-reassign
          fileList = getFileNamesForDir({
            dir: `${dir + cur}/`,
            fileList,
          });
        } else {
          const ext = cur.split('.').pop().toLowerCase();
          if (ext === 'sol') {
            fileList.push(cur);
          }
        }
      }
    );

    return fileList;
  }
