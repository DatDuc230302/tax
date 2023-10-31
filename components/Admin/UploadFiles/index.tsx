import { getNameFiles } from '@/functions/getNameFiles';
import { serverBackend } from '@/server';
import { Tooltip } from '@nextui-org/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsFileEarmarkPlus, BsTrash } from 'react-icons/bs';
import { LuFileText } from 'react-icons/lu';

export default function UploadFiles({
  filesArr,
  setFilesArr,
}: {
  filesArr: string[];
  setFilesArr: any;
}) {
  const [files, setFiles] = useState<object[]>(
    filesArr.length > 0 ? getNameFiles(filesArr) : []
  );

  // Lưu trạng thái tạm thời của mảng files
  const [tempFiles, setTempFiles] = useState(files);

  useEffect(() => {
    // Thiết lập lại trạng thái tạm thời khi filesArr thay đổi (nếu có)
    if (filesArr.length > 0) {
      setTempFiles(getNameFiles(filesArr));
    }
  }, [filesArr]);

  const handleGetFile = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('files', file);
        const result = await axios.post(`${serverBackend}/api/v1/uploadPostFile`, formData);
        if (result.data.message === 'success') {
          const name: string = file.name;
          // Cập nhật trạng thái tạm thời và mảng filesArr
          setTempFiles([
            ...tempFiles,
            {
              nameFile: name,
            },
          ]);
          setFilesArr([...filesArr, result.data.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllFiles = () => {
    // Xóa tất cả tệp trong trạng thái tạm thời
    setTempFiles([]);
  };

  const deleteFile = (nameFile: string) => {
    // Xóa tệp khỏi trạng thái tạm thời
    setTempFiles(tempFiles.filter((item: any) => item.nameFile !== nameFile));
  };

  const cancelDelete = () => {
    // Khôi phục trạng thái tạm thời từ trạng thái files ban đầu
    setTempFiles(files);
  };

  return (
    <div className="flex w-full border-[1px] p-2 border-[#ccc] h-[250px] flex-col">
      <div className="flex border-b-[1px] border-[#ccc] justify-between">
        <h2 className="flex font-bold items-center h-[40px]">Quản lý tài liệu</h2>
        <div className="flex gap-3 items-center">
          <Tooltip content="Thêm một tài liệu">
            <label htmlFor="uploadFile" className="h-full flex gap-1 cursor-pointer items-center">
              <BsFileEarmarkPlus fontSize={22} />
            </label>
          </Tooltip>
          <Tooltip content="Xóa tất cả tài liệu">
            <span className="cursor-pointer" onClick={() => deleteAllFiles()}>
              <BsTrash fontSize={22} />
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col h-full">
        {tempFiles.length > 0 ? (
          tempFiles.map((item: any, index: number) => (
            <div key={index} className="flex justify-between gap-2 py-2">
              <div className="flex items-center gap-1 text-[13px]">
                <LuFileText fontSize={20} />
                <span className="translate-y-[1px]">{item.nameFile}</span>
              </div>
              <i onClick={() => deleteFile(item.nameFile)} className="h-full items-center flex cursor-pointer">
                <AiOutlineClose fontSize={12} />
              </i>
            </div>
          ))
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <label htmlFor="uploadFile" className="flex cursor-pointer border-dashed border-[1px] border-[#ccc] rounded-[4px] p-8">
              <AiOutlinePlus fontSize={50} />
            </label>
          </div>
        )}
      </div>
      <input onChange={(e) => handleGetFile(e)} id="uploadFile" type="file" hidden />
      {tempFiles.length !== files.length && (
        <div className="flex justify-end mt-2">
          <button onClick={() => cancelDelete()} className="text-blue-500 cursor-pointer">
            Hủy xóa
          </button>
        </div>
      )}
    </div>
  );
}
