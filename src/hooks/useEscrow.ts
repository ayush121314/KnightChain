import { useState, useCallback, useMemo } from 'react';
import { EscrowContractAdapter, EscrowStatus } from '../contracts/EscrowContractAdapter';
import { PlayerWalletInfo } from '../types/game';

export function useEscrow() {
  // Escrow adapter for blockchain interactions
  const escrowAdapter = useMemo(() => new EscrowContractAdapter(
    'https://fullnode.testnet.aptoslabs.com/v1',
    '0x1' // Default module address, would be replaced with actual deployed address
  ), []);

  // Escrow state
  const [useSimulationMode, setUseSimulationMode] = useState<boolean>(false); // Default to false for production use
  const [escrowLocked, setEscrowLocked] = useState<boolean>(false);
  const [player1EscrowLocked, setPlayer1EscrowLocked] = useState<boolean>(false);
  const [player2EscrowLocked, setPlayer2EscrowLocked] = useState<boolean>(false);
  const [escrowAddress, setEscrowAddress] = useState<string | null>(null);
  const [escrowStatus, setEscrowStatus] = useState<EscrowStatus>(EscrowStatus.PENDING);
  const [escrowBalance, setEscrowBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize escrow
  const initializeEscrow = useCallback(async (
    player1Wallet: PlayerWalletInfo | null, 
    player2Wallet: PlayerWalletInfo | null
  ) => {
    if (!player1Wallet || !player2Wallet) {
      console.error("Cannot initialize escrow: both players must be connected");
      setError("Both players must be connected to initialize the escrow");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Initializing escrow contract");

      // In simulation mode, just set a fake address
      if (useSimulationMode) {
        try {
          const simulatedAddress = 'simulated_escrow_' + Date.now();
          console.log("Creating simulated escrow with address:", simulatedAddress);
          
          // Set the address in the adapter
          escrowAdapter.setEscrowAddress(simulatedAddress);
          
          // Set the address in our component state
          setEscrowAddress(simulatedAddress);
          
          console.log("Simulated escrow initialized with address:", simulatedAddress);
          
          // Add a small delay to ensure state updates
          await new Promise(resolve => setTimeout(resolve, 100));
          
          setIsLoading(false);
          return;
        } catch (simError) {
          console.error("Error in simulation mode:", simError);
          // Continue to try real mode, but log the error
        }
      }

      // Try connecting to Player 1's wallet
      console.log("Attempting to connect to Player 1's wallet for escrow initialization");
      
      // Show prompt for wallet connection
      window.alert("Please make sure a SEPARATE ESCROW wallet is selected in your Petra extension to initialize the escrow. This should NOT be the same as Player 1 or Player 2's wallet.");
      
      try {
        const response = await window.aptos.connect();
        
        // Check if this wallet is the same as player 1 or player 2
        if (response && response.address === player1Wallet.address) {
          window.alert("Error: This wallet is the same as Player 1's wallet. Please select a different wallet for escrow.");
          throw new Error("Escrow wallet cannot be the same as Player 1's wallet.");
        }
        
        if (response && response.address === player2Wallet.address) {
          window.alert("Error: This wallet is the same as Player 2's wallet. Please select a different wallet for escrow.");
          throw new Error("Escrow wallet cannot be the same as Player 2's wallet.");
        }
        
        // Proceed with escrow initialization
        if (response && response.address) {
          console.log("Connected to wallet, creating escrow");
          
          const initializeEscrowResult = await escrowAdapter.initializeEscrow(
            window.aptos,
            player1Wallet.address,
            player2Wallet.address,
            0.1, // Minimum bet of 0.1 APT
            24 * 60 * 60 // 24 hour timeout
          );
          
          if (initializeEscrowResult) {
            setEscrowAddress(initializeEscrowResult);
            console.log("Escrow contract created with address:", initializeEscrowResult);
            setIsLoading(false);
            return;
          }
        } else {
          console.warn("Connected to wrong wallet address:", response?.address);
          throw new Error(`Failed to connect wallet. Please make sure a valid wallet is selected.`);
        }
      } catch (error: any) {
        console.error("Error with direct Petra connection:", error);
        throw error;
      }
    } catch (error: any) {
      console.error("Error initializing escrow:", error);
      setError(error.message || "Failed to initialize escrow");
    } finally {
      setIsLoading(false);
    }
  }, [useSimulationMode, escrowAdapter]);

  // Create a simulated escrow (for testing)
  const createSimulatedEscrow = useCallback(() => {
    if (!useSimulationMode) {
      setError("Please enable simulation mode first");
      return;
    }
    
    console.log("Creating a simulated escrow for testing");
    const simulatedAddress = 'simulated_escrow_' + Date.now();
    escrowAdapter.setEscrowAddress(simulatedAddress);
    setEscrowAddress(simulatedAddress);
    console.log("Created simulated escrow with address:", simulatedAddress);
    
    // Also set escrow status to PENDING
    setEscrowStatus(EscrowStatus.PENDING);
  }, [useSimulationMode, escrowAdapter]);

  // Connect escrow wallet
  const connectEscrowWallet = useCallback(async (
    player1Wallet: PlayerWalletInfo | null,
    player2Wallet: PlayerWalletInfo | null
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Connecting escrow wallet...");
      
      if (typeof window === 'undefined' || !window.aptos) {
        setError("Petra wallet is not installed. Please install the Petra wallet extension.");
        setIsLoading(false);
        return;
      }
      
      // Prompt to select the escrow wallet
      window.alert("Please make sure your ESCROW wallet is selected in your Petra extension.\nIMPORTANT: This should be DIFFERENT from Player 1 and Player 2 wallets.");
      
      const response = await window.aptos.connect();
      console.log("Escrow wallet connection response:", response);
      
      if (response && response.address) {
        console.log("Connected to escrow wallet:", response.address);
        
        // Check if the wallet is the same as player 1 or player 2
        if (player1Wallet && player1Wallet.address === response.address) {
          window.alert("Error: This wallet is already being used by Player 1. Please select a different wallet for escrow.");
          throw new Error("Escrow wallet cannot be the same as Player 1's wallet.");
        }
        
        if (player2Wallet && player2Wallet.address === response.address) {
          window.alert("Error: This wallet is already being used by Player 2. Please select a different wallet for escrow.");
          throw new Error("Escrow wallet cannot be the same as Player 2's wallet.");
        }
        
        // Set the escrow address in the adapter
        escrowAdapter.setEscrowAddress(response.address);
        
        // Set the address in component state
        setEscrowAddress(response.address);
        
        console.log("Escrow wallet set successfully:", response.address);
      } else {
        throw new Error("Failed to get escrow wallet address");
      }
      
    } catch (error: any) {
      console.error("Error connecting escrow wallet:", error);
      setError(error.message || "Failed to connect escrow wallet");
    } finally {
      setIsLoading(false);
    }
  }, [escrowAdapter]);

  // Lock the escrow by transferring the minimum bet amount from a specific player
  const lockEscrow = useCallback(async (
    playerNumber: 1 | 2, 
    player1Wallet: PlayerWalletInfo | null,
    player2Wallet: PlayerWalletInfo | null,
    player1Bet: number,
    player2Bet: number,
    ensureCorrectWalletConnected: (playerNumber: 1 | 2) => Promise<boolean>,
    getAccountBalance: (address: string) => Promise<number>,
    transferToEscrow: (playerNumber: 1 | 2, amount: number, targetAddress: string) => Promise<boolean>
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Starting escrow locking process for Player ${playerNumber}`);
      console.log(`Current escrow lock status: Player 1: ${player1EscrowLocked}, Player 2: ${player2EscrowLocked}`);
      
      // Verify both players have placed bets
      if (player1Bet <= 0 || player2Bet <= 0) {
        throw new Error("Both players must announce bets before locking escrow");
      }
      
      // Determine the minimum bet amount (this is what will be deducted)
      const minimumBet = Math.min(player1Bet, player2Bet);
      console.log(`Minimum bet amount between players: ${minimumBet} APT`);
      
      // Get player wallet
      const playerWallet = playerNumber === 1 ? player1Wallet : player2Wallet;
      if (!playerWallet) {
        throw new Error(`Player ${playerNumber} wallet not connected`);
      }
      
      // In simulation mode, create an escrow if not yet initialized
      if (useSimulationMode && !escrowAddress) {
        console.log("No escrow initialized yet, but in simulation mode. Creating escrow now...");
        const simulatedAddress = 'simulated_escrow_' + Date.now();
        escrowAdapter.setEscrowAddress(simulatedAddress);
        setEscrowAddress(simulatedAddress);
        console.log("Auto-created simulated escrow with address:", simulatedAddress);
        
        // Brief pause to let state update
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Make sure an escrow address is set
      if (!escrowAddress) {
        throw new Error("No escrow wallet connected. Please connect the escrow wallet first.");
      }
      
      console.log(`Depositing ${minimumBet} APT to escrow contract from Player ${playerNumber}`);
      
      // Use simulation mode if enabled
      if (useSimulationMode) {
        console.log("Using simulation mode - no actual transfer will occur");
        
        // Simulate deposit
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update UI state
        if (playerNumber === 1) {
          setPlayer1EscrowLocked(true);
        } else {
          setPlayer2EscrowLocked(true);
        }
        
        console.log(`Simulated escrow lock successful for Player ${playerNumber}`);
        
        // Update escrow balance in simulation mode
        setEscrowBalance(prevBalance => prevBalance + minimumBet);
      } else {
        // Real deposit by transferring funds to the escrow address
        // Make sure the player's wallet is connected - strict verification
        let maxAttempts = 3;
        let isWalletConnected = false;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          isWalletConnected = await ensureCorrectWalletConnected(playerNumber);
          
          if (isWalletConnected) {
            break;
          }
          
          if (attempt < maxAttempts) {
            // Ask if they want to try again
            const shouldRetry = window.confirm(`Failed to connect the correct wallet for Player ${playerNumber}. Do you want to try again? (Attempt ${attempt}/${maxAttempts})`);
            if (!shouldRetry) {
              throw new Error(`Escrow locking cancelled - correct wallet for Player ${playerNumber} was not connected.`);
            }
          } else {
            throw new Error(`Failed to connect the correct wallet for Player ${playerNumber} after ${maxAttempts} attempts.`);
          }
        }
        
        if (!isWalletConnected) {
          throw new Error(`Could not verify Player ${playerNumber}'s wallet. Please make sure the correct wallet is connected.`);
        }
        
        // Direct transfer to escrow address - using minimumBet instead of player's full bet
        const transferSuccess = await transferToEscrow(playerNumber, minimumBet, escrowAddress);
        
        if (!transferSuccess) {
          throw new Error(`Failed to transfer funds to escrow for Player ${playerNumber}`);
        }
        
        // Update UI state
        if (playerNumber === 1) {
          setPlayer1EscrowLocked(true);
          
          // Refresh balance
          if (player1Wallet) {
            const newBalance = await getAccountBalance(player1Wallet.address);
          }
        } else {
          setPlayer2EscrowLocked(true);
          
          // Refresh balance
          if (player2Wallet) {
            const newBalance = await getAccountBalance(player2Wallet.address);
          }
        }
        
        console.log(`Escrow lock successful for Player ${playerNumber}`);
        
        // Update escrow balance - in real mode, we'd query the contract
        if (escrowAddress) {
          const escrowBalanceResult = await getAccountBalance(escrowAddress);
          setEscrowBalance(escrowBalanceResult);
        }
      }
      
      // Check if both players have locked their escrow after this player's lock
      const bothPlayersLocked = playerNumber === 1 
        ? true && player2EscrowLocked  // Player 1 just locked + check if Player 2 was already locked
        : player1EscrowLocked && true; // Check if Player 1 was already locked + Player 2 just locked
        
      if (bothPlayersLocked) {
        console.log("Both players have deposited funds to escrow. Ready to start game...");
        
        // Final pool amount is minimum bet × 2
        const finalPoolAmount = minimumBet * 2;
        
        console.log(`Setting final bet amount to ${finalPoolAmount} APT (${minimumBet} × 2)`);
        setEscrowLocked(true);
      } else {
        console.log(`Waiting for the other player to lock their escrow`);
      }
      
      return {
        wasLocked: true,
        playerNumber,
        minimumBet
      };
    } catch (error: any) {
      console.error(`Error locking escrow for Player ${playerNumber}:`, error);
      setError(error.message || `Failed to lock escrow for Player ${playerNumber}`);
      return {
        wasLocked: false,
        error: error.message || `Failed to lock escrow for Player ${playerNumber}`
      };
    } finally {
      setIsLoading(false);
    }
  }, [useSimulationMode, escrowAddress, player1EscrowLocked, player2EscrowLocked, escrowAdapter]);

  // Pay winner from escrow
  const payWinner = useCallback(async (
    winner: 'player1' | 'player2' | 'draw' | null,
    player1Wallet: PlayerWalletInfo | null,
    player2Wallet: PlayerWalletInfo | null,
    player1Bet: number,
    player2Bet: number,
    finalBetAmount: number,
    getAccountBalance: (address: string) => Promise<number>
  ) => {
    try {
      if (!winner) return;
      
      console.log(`Paying winner: ${winner}`);
      
      // Only proceed if not in simulation mode and escrow is locked
      if (!useSimulationMode && escrowLocked && escrowAddress) {
        // Verify escrow wallet - with retry mechanism
        let maxAttempts = 3;
        let escrowWalletConnected = null;
        let isCorrectWallet = false;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          // Show clear instructions about which wallet to connect
          window.alert(`Please select the ESCROW wallet (${escrowAddress.substring(0, 6)}...${escrowAddress.substring(escrowAddress.length - 4)}) in your Petra extension to transfer funds.
          
IMPORTANT: Only the escrow wallet can be used for this operation.`);
          
          try {
            escrowWalletConnected = await window.aptos.connect();
            
            if (escrowWalletConnected && escrowWalletConnected.address === escrowAddress) {
              isCorrectWallet = true;
              console.log("Successfully connected to escrow wallet:", escrowWalletConnected.address);
              break;
            } else {
              // Wrong wallet connected
              window.alert(`Error: Wrong wallet connected. 
              
Expected the escrow wallet (${escrowAddress.substring(0, 6)}...${escrowAddress.substring(escrowAddress.length - 4)}) 

but got a different wallet (${escrowWalletConnected?.address.substring(0, 6)}...${escrowWalletConnected?.address.substring(escrowWalletConnected.address.length - 4)}).`);
              
              if (attempt < maxAttempts) {
                const shouldRetry = window.confirm(`Failed to connect the correct escrow wallet. Do you want to try again? (Attempt ${attempt}/${maxAttempts})`);
                if (!shouldRetry) {
                  throw new Error(`Operation cancelled - escrow wallet was not connected.`);
                }
              }
            }
          } catch (error) {
            console.error("Error connecting to wallet:", error);
            if (attempt < maxAttempts) {
              const shouldRetry = window.confirm(`Error connecting to wallet. Do you want to try again? (Attempt ${attempt}/${maxAttempts})`);
              if (!shouldRetry) {
                throw new Error(`Operation cancelled due to wallet connection error.`);
              }
            } else {
              throw new Error(`Failed to connect wallet after ${maxAttempts} attempts.`);
            }
          }
        }
        
        if (!isCorrectWallet) {
          throw new Error("Failed to connect to the correct escrow wallet. Please ensure the correct wallet is selected.");
        }
        
        // Handle draw case
        if (winner === 'draw') {
          console.log("Draw game - returning funds to both players");
          
          // For a draw, return original bet amounts to each player
          // Return funds to Player 1
          if (player1Wallet) {
            console.log(`Returning ${player1Bet} APT to Player 1 from escrow`);
            const payload1 = {
              type: "entry_function_payload",
              function: "0x1::coin::transfer",
              type_arguments: ["0x1::aptos_coin::AptosCoin"],
              arguments: [player1Wallet.address, Math.floor(player1Bet * 100000000).toString()]
            };
            
            const txResponse1 = await window.aptos.signAndSubmitTransaction(payload1);
            console.log("Player 1 refund transaction:", txResponse1);
          }
          
          // Return funds to Player 2
          if (player2Wallet) {
            console.log(`Returning ${player2Bet} APT to Player 2 from escrow`);
            const payload2 = {
              type: "entry_function_payload",
              function: "0x1::coin::transfer",
              type_arguments: ["0x1::aptos_coin::AptosCoin"],
              arguments: [player2Wallet.address, Math.floor(player2Bet * 100000000).toString()]
            };
            
            const txResponse2 = await window.aptos.signAndSubmitTransaction(payload2);
            console.log("Player 2 refund transaction:", txResponse2);
          }
        } 
        // Handle winner case
        else {
          const winnerWallet = winner === 'player1' ? player1Wallet : player2Wallet;
          
          if (!winnerWallet) {
            throw new Error("Winner wallet not found");
          }
          
          console.log(`Transferring ${finalBetAmount} APT to winner (${winnerWallet.address})`);
          
          // Transfer all funds from escrow to winner
          const payload = {
            type: "entry_function_payload",
            function: "0x1::coin::transfer",
            type_arguments: ["0x1::aptos_coin::AptosCoin"],
            arguments: [winnerWallet.address, Math.floor(finalBetAmount * 100000000).toString()]
          };
          
          const txResponse = await window.aptos.signAndSubmitTransaction(payload);
          console.log("Winner payment transaction:", txResponse);
        }
        
        // Update player balances after transfers
        if (player1Wallet) {
          await getAccountBalance(player1Wallet.address);
        }
        
        if (player2Wallet) {
          await getAccountBalance(player2Wallet.address);
        }
      } 
      // Simulation mode handling
      else if (useSimulationMode) {
        if (winner === 'draw') {
          console.log("Draw game - both players receive their bets back (simulation)");
        } else {
          console.log(`Updating Player ${winner === 'player1' ? '1' : '2'} wallet balance: +${finalBetAmount} APT (simulation)`);
        }
      }
      
      console.log("Winner payment completed successfully");
    } catch (error: any) {
      console.error("Error paying winner:", error);
      setError(error.message || "Failed to pay winner");
    }
  }, [useSimulationMode, escrowLocked, escrowAddress]);

  // Reset escrow state
  const resetEscrowState = useCallback(() => {
    setPlayer1EscrowLocked(false);
    setPlayer2EscrowLocked(false);
    setEscrowLocked(false);
    setEscrowStatus(EscrowStatus.PENDING);
    setEscrowBalance(0);
  }, []);

  return {
    useSimulationMode,
    setUseSimulationMode,
    escrowLocked,
    setEscrowLocked,
    player1EscrowLocked, 
    setPlayer1EscrowLocked,
    player2EscrowLocked,
    setPlayer2EscrowLocked,
    escrowAddress,
    setEscrowAddress,
    escrowStatus,
    setEscrowStatus,
    escrowBalance,
    setEscrowBalance,
    isLoading,
    error,
    setError,
    initializeEscrow,
    createSimulatedEscrow,
    connectEscrowWallet,
    lockEscrow,
    payWinner,
    resetEscrowState,
    escrowAdapter
  };
} 