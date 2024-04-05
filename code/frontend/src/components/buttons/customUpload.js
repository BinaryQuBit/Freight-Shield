// React Imports
import React, { useState, useEffect } from "react";

// Chakra UI Imports
import {
  FormControl,
  Box,
  Input,
  FormErrorMessage,
  useColorMode,
} from "@chakra-ui/react";

// Icon Imports
import { FiUpload, FiXCircle } from "react-icons/fi";

// Start of the Build
export default function CustomUpload({
  id,
  label,
  required,
  isError,
  errorMessage,
  mt,
  accept = ".pdf,.doc,.docx,.jpg,.png,",
  setError,
  setFileState,
  fileUrl,
  mr,
  ml,
}) {
  const [file, setFile] = useState("");
  const [fileBlobUrl, setFileBlobUrl] = useState("");
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (fileUrl) {
      setFileBlobUrl(fileUrl);
    }
  }, [fileUrl]);

  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      const newFile = event.target.files[0];
      const newBlobUrl = URL.createObjectURL(newFile);
      setFile(newFile);
      setFileBlobUrl(newBlobUrl);
      if (setError) setError("");
      if (setFileState) setFileState(newFile);
    }
  };

  const handleFileRemove = () => {
    URL.revokeObjectURL(fileBlobUrl);
    setFile("");
    setFileBlobUrl("");
    if (setError) setError("");
    if (setFileState) setFileState("");
  };

  return (
    <FormControl id={id} isRequired={required} isInvalid={isError} mt={mt}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        border="1px solid lightgrey"
        padding="8px"
        borderRadius="4px"
        position="relative"
        rounded={"none"}
        mr={mr}
        ml={ml}
      >
        {fileBlobUrl ? (
          <>
            <a
              href={fileBlobUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginRight: "auto",
                color: colorMode === "dark" ? "white" : "blue",
              }} // Adjusting color based on color mode
            >
              View {label}
            </a>
            <FiXCircle
              color={colorMode === "dark" ? "white" : "blue"}
              onClick={handleFileRemove}
              cursor="pointer"
              size="1.25em"
            />
          </>
        ) : (
          <>
            <label htmlFor={`${id}Input`} style={{ marginRight: "auto" }}>
              Upload {label}
              {required && <span style={{ color: "red" }}>*</span>}
            </label>
            <FiUpload
              style={{
                marginRight: "8px",
                color: colorMode === "dark" ? "white" : "blue",
              }}
            />
            <Input
              type="file"
              accept={accept}
              id={`${id}Input`}
              onChange={handleFileChange}
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </>
        )}
      </Box>
      {isError && (
        <FormErrorMessage ml={ml || 0 + 4}>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
}
