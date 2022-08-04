import React, { FC, useState, useEffect, useMemo } from 'react';
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';

import {
    Button,
    Box,
    Typography,
    Container,
    TextField
} from '@mui/material';
import styled from 'styled-components'
import { PublicKey, ParsedAccountData, Transaction, SystemProgram } from '@solana/web3.js';

import Header from '../components/Header';
import { useProfileProgram } from '../hooks';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { RouteComponentProps } from 'react-router-dom';


export default function Profile({
    match: {
      params: { address }
    }
}: RouteComponentProps<{ address?: string }>) {

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const anchorWallet = useAnchorWallet();
    const program = useProfileProgram(connection, anchorWallet);
    const pubkey = useMemo(() => {
        return address ? new PublicKey(address) : publicKey;
    }, [
        address, publicKey
    ])
    const isMe = useMemo(() => {
        return pubkey?.toString() === publicKey?.toString();
    }, [
        pubkey, publicKey
    ]) 

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [likes, setLikes] = useState(0);

    const [exists, setExists] = useState(false);
    const [liked, setLiked] = useState(false);
    const [profilePda, setProfilePda] = useState<PublicKey>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const findProfilePda = async() => {

            if(pubkey && program) {
                const [profilePda, profileBump] = await PublicKey.findProgramAddress([
                    utf8.encode('PROFILE_STATE'), pubkey.toBuffer()
                ], program?.programId);
                setProfilePda(profilePda);
            }
        }

        findProfilePda();

    }, [
        pubkey, program
    ])

    useEffect(() => {

        const findProfileAccount = async() => {
            if(profilePda && program && !loading) {
                const account = await program.account.userProfile.fetchNullable(profilePda);
                if(account) {
                    setExists(true);
                    setName(account.name);
                    setLocation(account.location);
                    setLikes(account.likes);

                    if(!isMe && publicKey && pubkey) {
                        const [likePda, likeBump] = await PublicKey.findProgramAddress([
                            utf8.encode('LIKE_STATE'), publicKey.toBuffer(), pubkey.toBuffer(), 
                        ], program.programId);
                        const likeAccount = await program.account.userLike.fetchNullable(likePda);
                        if(likeAccount) {
                            setLiked(likeAccount.liked);
                        }
                        else {
                            setLiked(false);
                        }
                    }
                    
                }
                else {
                    setExists(false);
                }
            }
        }

        findProfileAccount();

    }, [
        profilePda, loading
    ])

    const handleInput = (e: any) => {
        const {name, value} = e.target;
        if(name === 'name') {
            setName(value);
        }
        if(name === 'location') {
            setLocation(value);
        }
    }

    const handleCreate = async () => {
        if(program && publicKey) {
            setLoading(true);

            try{
                await program.methods.createProfile(name, location)
                    .accounts({
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId
                    })
                    .rpc();
            }
            catch {
                //
            }

            setLoading(false);
        }
    }

    const handleUpdate = async () => {
        if(program && publicKey) {
            setLoading(true);

            try{
                await program.methods.updateProfile(name, location)
                    .accounts({
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId
                    })
                    .rpc();
            }
            catch {
                //
            }

            setLoading(false);
        }
    }

    const handleLike = async () => {
        if(program && publicKey && pubkey) {
            setLoading(true);

            try{
                const [likePda, likeBump] = await PublicKey.findProgramAddress([
                    utf8.encode('LIKE_STATE'), publicKey.toBuffer(), pubkey.toBuffer(), 
                ], program?.programId);

                await program.methods.likeProfile(pubkey)
                    .accounts({
                        userLike: likePda,
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId
                    })
                    .rpc();
            }
            catch {
                //
            }

            setLoading(false);
        }
    }

    const handleUnlike = async () => {
        if(program && publicKey && pubkey) {
            setLoading(true);

            try{
                const [likePda, likeBump] = await PublicKey.findProgramAddress([
                    utf8.encode('LIKE_STATE'), publicKey.toBuffer(), pubkey.toBuffer(), 
                ], program?.programId);
                
                await program.methods.unlikeProfile(pubkey)
                    .accounts({
                        userLike: likePda,
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId
                    })
                    .rpc();
            }
            catch {
                //
            }

            setLoading(false);
        }
    }

    return (
        <Container maxWidth="lg">

            <Header />

            <Box flexDirection='column' justifyContent='center' display='flex' height='600px' gap='24px'>

                <h1>
                    User Profile
                </h1>

                <TextField
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleInput}
                    variant="standard"
                />

                <TextField
                    label="Location"
                    name="location"
                    value={location}
                    onChange={handleInput}
                    variant="standard"
                />

                <TextField
                    label="Likes"
                    name="likes"
                    value={likes}
                    variant="standard"
                    disabled={true}
                />

                <Box>
                    {
                        isMe ?
                        (
                            exists ?
                            <Button variant='contained' onClick={handleUpdate} disabled={loading}>Update Profile</Button>
                            : <Button variant='contained' onClick={handleCreate} disabled={loading}>Create Profile</Button>
                        ) : (
                            liked ?
                            <Button variant='contained' onClick={handleUnlike} disabled={loading}>Unlike Profile</Button>
                            : <Button variant='contained' onClick={handleLike} disabled={loading}>Like Profile</Button>
                        )
                    }
                </Box>

            </Box>

        </Container >

    );
};