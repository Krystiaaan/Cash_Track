import {ReactNode} from "react";
import {Page} from "./Page.tsx"

export const BaseLayout =({
    children,
}: {
    children: ReactNode;
}) =>{
    return (
        <Page>{children}</Page>
    );
};
