import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

const RidePage = () => {
    const { id } = useParams();
    const [host, setHost] = useState([]);
    const [hostsLoaded, setHostsLoaded] = useState(false);

    useEffect(() => {
        fetch(`/host/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setHost(data.data[0]);
                setHostsLoaded(true);
            });
    }, [id]);

    if (!hostsLoaded) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <Container>
                <Info>
                    <Image
                        src={`data:image/jpeg;base64,${host.imageSrc}`}
                        width={100}
                        alt="ride"
                    />
                    <Price>{host.price}$/day</Price>
                    <FullName>
                        <Name>{host.name}</Name>
                        <Surname>{host.surname}</Surname>
                    </FullName>
                    <Category>{host.category}</Category>
                    <Description>{host.description}</Description>
                    <StyledButton to={`/profile/${host._id}`}>
                        <Button type="button">Contact Host</Button>
                    </StyledButton>
                </Info>
            </Container>
        </Wrapper>
    );
};

export default RidePage;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const Container = styled.div``;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: #43484c solid 2px;
    border-radius: 5px;
    padding: 40px;
`;

const Image = styled.img`
    height: 400px;
    width: 400px;
`;

const FullName = styled.div`
    display: flex;
    margin-top: 10px;
`;

const Name = styled.div`
    font-weight: bold;
`;

const Surname = styled.div`
    font-weight: bold;
    margin-left: 5px;
`;

const Category = styled.div`
    margin-top: 5px;
    font-style: italic;
`;

const Price = styled.div`
    font-weight: bold;
    margin-top: 20px;
`;

const Description = styled.div`
    max-width: 50%;
    text-align: justify;
    margin-top: 20px;
`;

const StyledButton = styled(NavLink)`
    text-decoration: none;
    /* display: flex;
    justify-content: center; */
    margin-top: 20px;
`;

const Button = styled.button`
    border: none;
    background-color: var(--color-1);
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;

const spin = keyframes`
  from {transform:rotate(0deg)};
    to {transform:rotate(360deg)};
`;

const Loading = styled(FiLoader)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1500ms linear infinite;
    color: var(--primary-color);
`;
