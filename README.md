# ReClaim – Wallet Backup & Recovery UI Flow

## 1️⃣ Home Screen

### UI Elements:

- **App Logo & Name**: ReClaim
- **Two main buttons**:
  - Register / Backup Wallet
  - Recover Wallet

### Behind the Curtains:

- Nothing happens yet; this is purely the landing page
- The app initializes: fetches backend config, optionally preloads IPFS/Web3 storage SDK, checks if Self SDK is available

---

## 2️⃣ Register / Backup Wallet

### Step 1: Enter Wallet Details

#### UI Elements:

- **Input fields**:
  - Wallet Public Key (0x...)
  - Wallet Private Key (hidden input, optionally masked)
- **Button**: Continue

#### Behind the Curtains:

- Validate format of public and private keys
- Generate client-side cryptographically secure random backup key K (32 bytes)
- Hold K in memory temporarily for encryption/sharing
- Validate that the entered private key matches the public key (sign a challenge internally)

### Step 2: Choose Backup Method

#### UI Elements:

- **Checkboxes or radio options**:
  - [ ] Secondary Wallet (W2)
  - [ ] Self.xyz
  - [ ] Both (recommended)
- **Button**: Next

#### Behind the Curtains:

- Save user choice temporarily
- Determine which cryptographic flow to trigger:
  - W2 only → Generate S_w2 share
  - Self only → Generate S_self share
  - Both → Split K into S_w2 + S_self (2-of-2)

### Step 3a: Secondary Wallet (if selected)

#### UI Elements:

- Connect W2 button (via WalletConnect / Web3 wallet)
- Info tooltip: "This wallet will help you recover your key in combination with Self.xyz or alone"

#### Behind the Curtains:

- Retrieve W2 public key (from wallet signature or direct API)
- Encrypt S_w2 using ECIES with W2 public key
- Store enc_S_w2 in temporary JSON blob
- Prepare for IPFS upload later

### Step 3b: Self.xyz (if selected)

#### UI Elements:

- QR code placeholder: "Scan this QR with your Self app to authorize backup"
- Info tooltip: "Self will hold a share of your key and ensure secure recovery"

#### Behind the Curtains:

- Generate a unique nullifier for the user (or fetch existing one)
- Nullifier ensures identity uniqueness and prevents double-recovery attacks
- Display QR code linking the backend + nullifier
- User scans QR with Self app:
  - Self app authenticates user
  - Generates a device public key if none exists
  - Returns signed attestation + device public key
- Encrypt S_self using the device public key via ECIES
- Store enc_S_self + attestation + nullifier in temporary JSON blob

### Step 4: Finalization & Storage

#### UI Elements:

- **Display summary**:
  - Backup method(s) selected
  - Success message: "Your wallet backup is ready and stored securely"
- **Button**: Finish / Upload

#### Behind the Curtains:

- Encrypt wallet private key with combined key K (AES-GCM / XChaCha20-Poly1305)
- Assemble IPFS blob JSON:
  ```json
  {
    "primary": "0x123...",
    "enc_priv": { ... },
    "enc_S_w2": { ... },
    "enc_S_self": { ... },
    "self_attestation": { ... },
    "nullifier": "unique_self_id",
    "meta": { "created_at": 169xxx, "version": 1 }
  }
  ```
- Upload blob to IPFS/Web3.Storage → get CID
- Store primary -> CID mapping in registry contract on-chain
- Clear sensitive data from memory

---

## 3️⃣ Recover Wallet

### Step 1: Enter Public Key

#### UI Elements:

- Input field: Wallet Public Key (0x...)
- Button: Next

#### Behind the Curtains:

- Query registry contract to get IPFS CID for the given public key
- Fetch blob from IPFS
- Check backup method(s) from blob (W2 only, Self only, Both)
- Prepares recovery flow based on backup method

### Step 2: Follow Recovery Steps

#### W2 Required

**UI Elements:**

- Connect W2 button
- Tooltip: "Your recovery wallet will release its encrypted share to reconstruct your backup key"

**Behind the Curtains:**

- W2 decrypts enc_S_w2 on-device using ECIES
- Returns S_w2 to client

#### Self Required

**UI Elements:**

- QR code: "Scan this with Self app to authorize recovery"
- Info tooltip: "Self will release your encrypted share securely"

**Behind the Curtains:**

- Backend sends nullifier + encrypted share info to Self
- Self verifies user identity + device integrity
- Device decrypts enc_S_self using device private key
- Returns S_self to client

### Step 3: Reconstruct Backup Key & Private Key

#### Behind the Curtains:

- Combine shares to reconstruct backup key K
- XOR combine (2-of-2) or Shamir recombination
- Decrypt wallet private key using K
- Present private key to user OR allow direct wallet import

#### UI Elements:

- Display decrypted private key (masked)
- Buttons: Copy, Import to Wallet, Done

---

## 4️⃣ Optional Features / UX Enhancements

### Device Migration Handling (Self):

- Detect if device public key has changed (different nullifier or new attestation)
- Provide migration instructions via Self SDK

### Backup Summary & Verification:

- Show which recovery methods were used
- Allow users to test recovery flow without exposing private key (simulation mode)

### Security Notices:

- Highlight that both W2 + Self are mandatory if chosen
- Warn about losing W2 or Self device

---

## 5️⃣ Flow Diagram (Text Version)

```
Home
├── Register Wallet
│   ├── Enter W1 public/private keys
│   ├── Choose backup method: W2 / Self / Both
│   ├── W2: connect & encrypt S_w2
│   ├── Self: scan QR → get pubKey + attestation → encrypt S_self
│   └── Encrypt W1 private key with K → store blob on IPFS → registry
└── Recover Wallet
    ├── Enter W1 public key
    ├── Fetch blob from IPFS → check backup method
    ├── W2: decrypt S_w2
    ├── Self: scan QR → decrypt S_self
    └── Combine shares → decrypt W1 private key → show to user
```
