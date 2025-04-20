import {GetServerSideProps} from "next";

const Component = () => {
    return (
        <>
        </>
    )
};

export default Component;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: "pick",
            permanent: true
        }
    }
}