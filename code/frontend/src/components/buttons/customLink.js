import React from "react";
import { Button } from "@chakra-ui/react";

export default function CustomLink({ onClick, children, ml, mr, fontSize }) {
    return (
        <Button
            variant={"link"}
            color={"#0866FF"}
            fontSize={fontSize}
            onClick={onClick}
            ml={ml}
            mr={mr}
        >
            {children}
        </Button>
    )
}
