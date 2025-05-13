betting-patterns-1  | Net profit/loss: $-415                                                        
betting-patterns-1  | Maximum bankroll: $7,042.5                                                    
betting-patterns-1  | Minimum bankroll: $4,090                                                      
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== D'Alembert Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 300                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  | 
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 165 (55.00% of planned games)                                   
betting-patterns-1  | Banker wins: 72 (43.64%)                                                      
betting-patterns-1  | Player wins: 80 (48.48%)                                                      
betting-patterns-1  | Ties: 13 (7.88%)                                                              
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 165                                                              
betting-patterns-1  | Largest bet: $950                                                             
betting-patterns-1  | Max consecutive losses: 6                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $907.5 (12.96% of starting bankroll)                         
betting-patterns-1  | Net profit/loss: $-6,092.5                                                    
betting-patterns-1  | Maximum bankroll: $9,000
betting-patterns-1  | Minimum bankroll: $907.5                                                      
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Labouchère Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 300                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 300 (100.00% of planned games)                                  
betting-patterns-1  | Banker wins: 128 (42.67%)                                                     
betting-patterns-1  | Player wins: 145 (48.33%)                                                     
betting-patterns-1  | Ties: 27 (9.00%)                                                              
betting-patterns-1  | 
betting-patterns-1  | Bets placed: 300                                                              
betting-patterns-1  | Largest bet: $750                                                             
betting-patterns-1  | Max consecutive losses: 6                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $4,325 (61.79% of starting bankroll)                         
betting-patterns-1  | Net profit/loss: $-2,675                                                      
betting-patterns-1  | Maximum bankroll: $8,157.5                                                    
betting-patterns-1  | Minimum bankroll: $4,040                                                      
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Strategy Comparison ====                                                 
betting-patterns-1  | flat strategy: $6,057.5 (86.54%), Net: $-942.5                                
betting-patterns-1  | martingale strategy: $12,272.5 (175.32%), Net: $+5,272.5                      
betting-patterns-1  | fibonacci strategy: $6,585 (94.07%), Net: $-415                               
betting-patterns-1  | dAlembert strategy: $907.5 (12.96%), Net: $-6,092.5
betting-patterns-1  | labouchere strategy: $4,325 (61.79%), Net: $-2,675                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Best performing strategy: martingale with ending bankroll of $12,272.5        
betting-patterns-1  |                                                                               
betting-patterns-1  | Calculated house edge (from flat betting): 6.2833%                            
betting-patterns-1  | Theoretical house edge for banker bets: 1.06%, player bets: 1.24%             
betting-patterns-1 exited with code 0

C:\Users\Synza\Desktop\baccarat-engine-master> run-analysis-fixed.bat
Baccarat Betting Pattern Analysis (Fixed Version)
==============================================

Please select an analysis to run:

1) Basic Betting Patterns Analysis
2) House Edge Compounding Analysis
3) Run Both Analyses
4) Interactive Shell
5) Exit

Enter your choice (1-5): 1
Running Basic Betting Patterns Analysis...
time="2025-03-06T22:05:06-08:00" level=warning msg="C:\\Users\\Synza\\Desktop\\baccarat-engine-master\\docker-compose.fixed.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Building 2.6s (12/12) FINISHED                                             docker:desktop-linux
 => [betting-patterns internal] load build definition from Dockerfile.fixed                    0.0s
 => => transferring dockerfile: 458B                                                           0.0s 
 => [betting-patterns internal] load metadata for docker.io/library/node:18-alpine             0.7s 
 => [betting-patterns internal] load .dockerignore                                             0.0s
 => => transferring context: 2B                                                                0.0s 
 => [betting-patterns 1/6] FROM docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e  0.0s 
 => => resolve docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e3fe9bfbdb6571ab3c  0.0s 
 => [betting-patterns internal] load build context                                             0.0s 
 => => transferring context: 7.84kB                                                            0.0s 
 => CACHED [betting-patterns 2/6] WORKDIR /app                                                 0.0s
 => CACHED [betting-patterns 3/6] COPY package*.json ./                                        0.0s 
 => CACHED [betting-patterns 4/6] RUN npm install                                              0.0s 
 => [betting-patterns 5/6] COPY . .                                                            0.1s 
 => [betting-patterns 6/6] RUN npm list shuffle-array || npm install shuffle-array             1.0s 
 => [betting-patterns] exporting to image                                                      0.5s 
 => => exporting layers                                                                        0.3s 
 => => exporting manifest sha256:27b2e129b155652fbadca04922f7c23a9a99503ae9d33d1aa09b4e1c9524  0.0s 
 => => exporting config sha256:874598c04ef88b9c44dabc81cb65136c71393c2c3b19d6377b6ad42c83ebca  0.0s 
 => => exporting attestation manifest sha256:37d1da17f8d28b8f79f59649e89948cc954f053889676ec6  0.1s 
 => => exporting manifest list sha256:e40414a2adcd43a6c920bfcb8e4820d21b22b5557eb18bad703b2a9  0.0s 
 => => naming to docker.io/library/baccarat-engine-master-betting-patterns:latest              0.0s 
 => => unpacking to docker.io/library/baccarat-engine-master-betting-patterns:latest           0.1s 
 => [betting-patterns] resolving provenance for metadata file                                  0.0s 
[+] Running 2/2
 ✔ betting-patterns                                     Built                                  0.0s 
 ✔ Container baccarat-engine-master-betting-patterns-1  Recreated                              0.2s 
Attaching to betting-patterns-1
betting-patterns-1  |
betting-patterns-1  | ==== Flat Betting Strategy Simulation ====
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 500                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 500 (100.00% of planned games)
betting-patterns-1  | Banker wins: 244 (48.80%)                                                     
betting-patterns-1  | Player wins: 211 (42.20%)                                                     
betting-patterns-1  | Ties: 45 (9.00%)                                                              
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 500                                                              
betting-patterns-1  | Largest bet: $5                                                               
betting-patterns-1  | Max consecutive losses: 12
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $7,104 (101.49% of starting bankroll)                        
betting-patterns-1  | Net profit/loss: $+104                                                        
betting-patterns-1  | Maximum bankroll: $7,109                                                      
betting-patterns-1  | Minimum bankroll: $6,954.75                                                   
betting-patterns-1  | 
betting-patterns-1  | ==== Martingale Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 500                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 500 (100.00% of planned games)                                  
betting-patterns-1  | Banker wins: 231 (46.20%)
betting-patterns-1  | Player wins: 224 (44.80%)                                                     
betting-patterns-1  | Ties: 45 (9.00%)                                                              
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 500                                                              
betting-patterns-1  | Largest bet: $2,560                                                           
betting-patterns-1  | Max consecutive losses: 9                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $7,777.25 (111.10% of starting bankroll)                     
betting-patterns-1  | Net profit/loss: $+777.25                                                     
betting-patterns-1  | Maximum bankroll: $7,777.25                                                   
betting-patterns-1  | Minimum bankroll: $4,719.25
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Fibonacci Strategy Simulation ====                                       
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 500                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 500 (100.00% of planned games)                                  
betting-patterns-1  | Banker wins: 245 (49.00%)                                                     
betting-patterns-1  | Player wins: 211 (42.20%)                                                     
betting-patterns-1  | Ties: 44 (8.80%)                                                              
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 500                                                              
betting-patterns-1  | Largest bet: $445
betting-patterns-1  | Max consecutive losses: 10                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $7,003.5 (100.05% of starting bankroll)                      
betting-patterns-1  | Net profit/loss: $+3.5                                                        
betting-patterns-1  | Maximum bankroll: $7,140                                                      
betting-patterns-1  | Minimum bankroll: $6,424.5                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== D'Alembert Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 500                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 500 (100.00% of planned games)
betting-patterns-1  | Banker wins: 226 (45.20%)                                                     
betting-patterns-1  | Player wins: 224 (44.80%)                                                     
betting-patterns-1  | Ties: 50 (10.00%)                                                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 500                                                              
betting-patterns-1  | Largest bet: $140                                                             
betting-patterns-1  | Max consecutive losses: 9                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $7,261.75 (103.74% of starting bankroll)                     
betting-patterns-1  | Net profit/loss: $+261.75                                                     
betting-patterns-1  | Maximum bankroll: $7,261.75                                                   
betting-patterns-1  | Minimum bankroll: $5,314                                                      
betting-patterns-1  | 
betting-patterns-1  | ==== Labouchère Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 500                                              
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 500 (100.00% of planned games)                                  
betting-patterns-1  | Banker wins: 230 (46.00%)                                                     
betting-patterns-1  | Player wins: 211 (42.20%)                                                     
betting-patterns-1  | Ties: 59 (11.80%)                                                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 500                                                              
betting-patterns-1  | Largest bet: $35
betting-patterns-1  | Max consecutive losses: 9                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $7,140.5 (102.01% of starting bankroll)                      
betting-patterns-1  | Net profit/loss: $+140.5                                                      
betting-patterns-1  | Maximum bankroll: $7,519.25                                                   
betting-patterns-1  | Minimum bankroll: $6,902                                                      
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Strategy Comparison ====                                                 
betting-patterns-1  | flat strategy: $7,104 (101.49%), Net: $+104                                   
betting-patterns-1  | martingale strategy: $7,777.25 (111.10%), Net: $+777.25                       
betting-patterns-1  | fibonacci strategy: $7,003.5 (100.05%), Net: $+3.5                            
betting-patterns-1  | dAlembert strategy: $7,261.75 (103.74%), Net: $+261.75                        
betting-patterns-1  | labouchere strategy: $7,140.5 (102.01%), Net: $+140.5
betting-patterns-1  |                                                                               
betting-patterns-1  | Best performing strategy: martingale with ending bankroll of $7,777.25        
betting-patterns-1  |                                                                               
betting-patterns-1  | Calculated house edge (from flat betting): -4.1600%                           
betting-patterns-1  | Theoretical house edge for banker bets: 1.06%, player bets: 1.24%             
betting-patterns-1 exited with code 0

C:\Users\Synza\Desktop\baccarat-engine-master>1able Watch
'1' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\Synza\Desktop\baccarat-engine-master> run-analysis-fixed.bat
Baccarat Betting Pattern Analysis (Fixed Version)
==============================================

Please select an analysis to run:

1) Basic Betting Patterns Analysis
2) House Edge Compounding Analysis
3) Run Both Analyses
4) Interactive Shell
5) Exit

Enter your choice (1-5): 1
Running Basic Betting Patterns Analysis...
time="2025-03-06T22:08:32-08:00" level=warning msg="C:\\Users\\Synza\\Desktop\\baccarat-engine-master\\docker-compose.fixed.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Building 2.0s (12/12) FINISHED                                             docker:desktop-linux
 => [betting-patterns internal] load build definition from Dockerfile.fixed                    0.0s
 => => transferring dockerfile: 458B                                                           0.0s 
 => [betting-patterns internal] load metadata for docker.io/library/node:18-alpine             0.4s 
 => [betting-patterns internal] load .dockerignore                                             0.0s
 => => transferring context: 2B                                                                0.0s 
 => [betting-patterns 1/6] FROM docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e  0.0s 
 => => resolve docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e3fe9bfbdb6571ab3c  0.0s 
 => [betting-patterns internal] load build context                                             0.0s 
 => => transferring context: 7.85kB                                                            0.0s 
 => CACHED [betting-patterns 2/6] WORKDIR /app                                                 0.0s
 => CACHED [betting-patterns 3/6] COPY package*.json ./                                        0.0s 
 => CACHED [betting-patterns 4/6] RUN npm install                                              0.0s 
 => [betting-patterns 5/6] COPY . .                                                            0.1s 
 => [betting-patterns 6/6] RUN npm list shuffle-array || npm install shuffle-array             0.7s 
 => [betting-patterns] exporting to image                                                      0.5s 
 => => exporting layers                                                                        0.2s 
 => => exporting manifest sha256:4d2007d20d4da8875f482b4a937efe3344e8625a338cfb2a1e5d74382d69  0.0s 
 => => exporting config sha256:8080100c3c85735e6282333a93be60b25fc07846dda230ab31314140815d81  0.0s 
 => => exporting attestation manifest sha256:1aca0d0e335eae90875884af848272ae00e4b37f7f6c4b64  0.1s 
 => => exporting manifest list sha256:9126c25ada9a64035c201e52b3305a80958a8e1097cd487ac53fa77  0.0s 
 => => naming to docker.io/library/baccarat-engine-master-betting-patterns:latest              0.0s 
 => => unpacking to docker.io/library/baccarat-engine-master-betting-patterns:latest           0.1s 
 => [betting-patterns] resolving provenance for metadata file                                  0.0s 
[+] Running 2/2
 ✔ betting-patterns                                     Built                                  0.0s 
 ✔ Container baccarat-engine-master-betting-patterns-1  Recreated                              0.2s 
Attaching to betting-patterns-1
betting-patterns-1  |
betting-patterns-1  | ==== Flat Betting Strategy Simulation ====
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.02 seconds.
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,236 (44.72%)                                                   
betting-patterns-1  | Player wins: 2,267 (45.34%)                                                   
betting-patterns-1  | Ties: 497 (9.94%)                                                             
betting-patterns-1  | 
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $5                                                               
betting-patterns-1  | Max consecutive losses: 12                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $6,286 (89.80% of starting bankroll)                         
betting-patterns-1  | Net profit/loss: $-714                                                        
betting-patterns-1  | Maximum bankroll: $7,048.5
betting-patterns-1  | Minimum bankroll: $5,944.75                                                   
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Martingale Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.01 seconds.
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,212 (44.24%)                                                   
betting-patterns-1  | Player wins: 2,288 (45.76%)                                                   
betting-patterns-1  | Ties: 500 (10.00%)                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $1,280                                                           
betting-patterns-1  | Max consecutive losses: 8                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $15,280.5 (218.29% of starting bankroll)                     
betting-patterns-1  | Net profit/loss: $+8,280.5
betting-patterns-1  | Maximum bankroll: $15,280.5                                                   
betting-patterns-1  | Minimum bankroll: $6,618.75                                                   
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Fibonacci Strategy Simulation ====                                       
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.01 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,330 (46.60%)                                                   
betting-patterns-1  | Player wins: 2,178 (43.56%)                                                   
betting-patterns-1  | Ties: 492 (9.84%)                                                             
betting-patterns-1  | 
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $720                                                             
betting-patterns-1  | Max consecutive losses: 11                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $8,080.75 (115.44% of starting bankroll)                     
betting-patterns-1  | Net profit/loss: $+1,080.75                                                   
betting-patterns-1  | Maximum bankroll: $8,550.75                                                   
betting-patterns-1  | Minimum bankroll: $6,999.5                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== D'Alembert Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  | 
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,324 (46.48%)                                                   
betting-patterns-1  | Player wins: 2,176 (43.52%)                                                   
betting-patterns-1  | Ties: 500 (10.00%)                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $195                                                             
betting-patterns-1  | Max consecutive losses: 10                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $10,550.25 (150.72% of starting bankroll)                    
betting-patterns-1  | Net profit/loss: $+3,550.25                                                   
betting-patterns-1  | Maximum bankroll: $11,300.5
betting-patterns-1  | Minimum bankroll: $6,156.75                                                   
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Labouchère Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $7,000                                                     
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.00 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,343 (46.86%)                                                   
betting-patterns-1  | Player wins: 2,192 (43.84%)                                                   
betting-patterns-1  | Ties: 465 (9.30%)                                                             
betting-patterns-1  | 
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $40                                                              
betting-patterns-1  | Max consecutive losses: 13                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $7,675 (109.64% of starting bankroll)                        
betting-patterns-1  | Net profit/loss: $+675                                                        
betting-patterns-1  | Maximum bankroll: $8,238                                                      
betting-patterns-1  | Minimum bankroll: $5,939                                                      
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Strategy Comparison ====                                                 
betting-patterns-1  | flat strategy: $6,286 (89.80%), Net: $-714                                    
betting-patterns-1  | martingale strategy: $15,280.5 (218.29%), Net: $+8,280.5                      
betting-patterns-1  | fibonacci strategy: $8,080.75 (115.44%), Net: $+1,080.75
betting-patterns-1  | dAlembert strategy: $10,550.25 (150.72%), Net: $+3,550.25                     
betting-patterns-1  | labouchere strategy: $7,675 (109.64%), Net: $+675                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Best performing strategy: martingale with ending bankroll of $15,280.5        
betting-patterns-1  |                                                                               
betting-patterns-1  | Calculated house edge (from flat betting): 2.8560%                            
betting-patterns-1  | Theoretical house edge for banker bets: 1.06%, player bets: 1.24%             
betting-patterns-1 exited with code 0

C:\Users\Synza\Desktop\baccarat-engine-master> run-analysis-fixed.bat
Baccarat Betting Pattern Analysis (Fixed Version)
==============================================

Please select an analysis to run:

1) Basic Betting Patterns Analysis
2) House Edge Compounding Analysis
3) Run Both Analyses
4) Interactive Shell
5) Exit

Enter your choice (1-5): 1
Running Basic Betting Patterns Analysis...
time="2025-03-06T22:18:46-08:00" level=warning msg="C:\\Users\\Synza\\Desktop\\baccarat-engine-master\\docker-compose.fixed.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Building 3.1s (12/12) FINISHED                                             docker:desktop-linux
 => [betting-patterns internal] load build definition from Dockerfile.fixed                    0.0s
 => => transferring dockerfile: 458B                                                           0.0s 
 => [betting-patterns internal] load metadata for docker.io/library/node:18-alpine             0.7s 
 => [betting-patterns internal] load .dockerignore                                             0.0s
 => => transferring context: 2B                                                                0.0s 
 => [betting-patterns 1/6] FROM docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e  0.2s 
 => => resolve docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e3fe9bfbdb6571ab3c  0.2s 
 => [betting-patterns internal] load build context                                             0.0s 
 => => transferring context: 7.85kB                                                            0.0s
 => CACHED [betting-patterns 2/6] WORKDIR /app                                                 0.0s
 => CACHED [betting-patterns 3/6] COPY package*.json ./                                        0.0s 
 => CACHED [betting-patterns 4/6] RUN npm install                                              0.0s 
 => [betting-patterns 5/6] COPY . .                                                            0.2s 
 => [betting-patterns 6/6] RUN npm list shuffle-array || npm install shuffle-array             1.0s 
 => [betting-patterns] exporting to image                                                      0.8s 
 => => exporting layers                                                                        0.3s 
 => => exporting manifest sha256:06e4e19dc1039bc46ab4894a7337e7cfc966156cd752df0899d418f6199e  0.2s 
 => => exporting config sha256:590af64e22010cf8cf62b42585b283f86fec822c65e2646b4328b2e609c57c  0.0s 
 => => exporting attestation manifest sha256:83375344d718e9d8443c3818a25bba9660ba19165429219c  0.1s 
 => => exporting manifest list sha256:199bf98da3398ed29d272d6a8e8bc499f68984a89a9f8cf24b16bc8  0.0s 
 => => naming to docker.io/library/baccarat-engine-master-betting-patterns:latest              0.0s 
 => => unpacking to docker.io/library/baccarat-engine-master-betting-patterns:latest           0.1s 
 => [betting-patterns] resolving provenance for metadata file                                  0.0s 
[+] Running 2/2
 ✔ betting-patterns                                     Built                                  0.0s 
 ✔ Container baccarat-engine-master-betting-patterns-1  Recreated                              0.8s 
Attaching to betting-patterns-1
betting-patterns-1  |
betting-patterns-1  | ==== Flat Betting Strategy Simulation ====
betting-patterns-1  | Starting bankroll: $26,000                                                    
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.02 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,283 (45.66%)
betting-patterns-1  | Player wins: 2,223 (44.46%)                                                   
betting-patterns-1  | Ties: 494 (9.88%)                                                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $5                                                               
betting-patterns-1  | Max consecutive losses: 9                                                     
betting-patterns-1  | 
betting-patterns-1  | Ending bankroll: $25,729.25 (98.96% of starting bankroll)                     
betting-patterns-1  | Net profit/loss: $-270.75                                                     
betting-patterns-1  | Maximum bankroll: $26,250.75                                                  
betting-patterns-1  | Minimum bankroll: $25,694.25                                                  
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Martingale Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $26,000                                                    
betting-patterns-1  | Number of games to simulate: 5,000
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.01 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,314 (46.28%)                                                   
betting-patterns-1  | Player wins: 2,193 (43.86%)                                                   
betting-patterns-1  | Ties: 493 (9.86%)                                                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $5,120                                                           
betting-patterns-1  | Max consecutive losses: 10                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $34,649.5 (133.27% of starting bankroll)
betting-patterns-1  | Net profit/loss: $+8,649.5                                                    
betting-patterns-1  | Maximum bankroll: $34,649.5                                                   
betting-patterns-1  | Minimum bankroll: $24,735.5                                                   
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Fibonacci Strategy Simulation ====                                       
betting-patterns-1  | Starting bankroll: $26,000                                                    
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.01 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,283 (45.66%)                                                   
betting-patterns-1  | Player wins: 2,238 (44.76%)                                                   
betting-patterns-1  | Ties: 479 (9.58%)                                                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $1,885                                                           
betting-patterns-1  | Max consecutive losses: 13                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $24,920 (95.85% of starting bankroll)
betting-patterns-1  | Net profit/loss: $-1,080                                                      
betting-patterns-1  | Maximum bankroll: $26,599.5                                                   
betting-patterns-1  | Minimum bankroll: $23,046                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== D'Alembert Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $26,000                                                    
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.01 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,208 (44.16%)                                                   
betting-patterns-1  | Player wins: 2,269 (45.38%)
betting-patterns-1  | Ties: 523 (10.46%)                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $365                                                             
betting-patterns-1  | Max consecutive losses: 11                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | Ending bankroll: $3,183.5 (12.24% of starting bankroll)                       
betting-patterns-1  | Net profit/loss: $-22,816.5                                                   
betting-patterns-1  | Maximum bankroll: $26,474.25                                                  
betting-patterns-1  | Minimum bankroll: $3,183.5                                                    
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Labouchère Strategy Simulation ====                                      
betting-patterns-1  | Starting bankroll: $26,000
betting-patterns-1  | Number of games to simulate: 5,000                                            
betting-patterns-1  | Betting on: banker                                                            
betting-patterns-1  |                                                                               
betting-patterns-1  | Simulation completed in 0.01 seconds.                                         
betting-patterns-1  | Games played: 5,000 (100.00% of planned games)                                
betting-patterns-1  | Banker wins: 2,299 (45.98%)                                                   
betting-patterns-1  | Player wins: 2,233 (44.66%)                                                   
betting-patterns-1  | Ties: 468 (9.36%)                                                             
betting-patterns-1  |                                                                               
betting-patterns-1  | Bets placed: 5,000                                                            
betting-patterns-1  | Largest bet: $820                                                             
betting-patterns-1  | Max consecutive losses: 11                                                    
betting-patterns-1  | 
betting-patterns-1  | Ending bankroll: $24,539.75 (94.38% of starting bankroll)                     
betting-patterns-1  | Net profit/loss: $-1,460.25                                                   
betting-patterns-1  | Maximum bankroll: $26,142.5                                                   
betting-patterns-1  | Minimum bankroll: $24,126                                                     
betting-patterns-1  |                                                                               
betting-patterns-1  | ==== Strategy Comparison ====                                                 
betting-patterns-1  | flat strategy: $25,729.25 (98.96%), Net: $-270.75                             
betting-patterns-1  | martingale strategy: $34,649.5 (133.27%), Net: $+8,649.5                      
betting-patterns-1  | fibonacci strategy: $24,920 (95.85%), Net: $-1,080                            
betting-patterns-1  | dAlembert strategy: $3,183.5 (12.24%), Net: $-22,816.5                        
betting-patterns-1  | labouchere strategy: $24,539.75 (94.38%), Net: $-1,460.25                     
betting-patterns-1  |                                                                               
betting-patterns-1  | Best performing strategy: martingale with ending bankroll of $34,649.5        
betting-patterns-1  | 
betting-patterns-1  | Calculated house edge (from flat betting): 1.0830%                            
betting-patterns-1  | Theoretical house edge for banker bets: 1.06%, player bets: 1.24%             
betting-patterns-1 exited with code 0

C:\Users\Synza\Desktop\baccarat-engine-master> run-analysis-fixed.bat
Baccarat Betting Pattern Analysis (Fixed Version)
==============================================

Please select an analysis to run:

1) Basic Betting Patterns Analysis
2) House Edge Compounding Analysis
3) Run Both Analyses
4) Interactive Shell
5) Exit

Enter your choice (1-5): 2
Running House Edge Compounding Analysis...
time="2025-03-06T22:21:14-08:00" level=warning msg="C:\\Users\\Synza\\Desktop\\baccarat-engine-master\\docker-compose.fixed.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] Building 1.3s (12/12) FINISHED                                             docker:desktop-linux
 => [house-edge internal] load build definition from Dockerfile.fixed                          0.0s
 => => transferring dockerfile: 458B                                                           0.0s 
 => [house-edge internal] load metadata for docker.io/library/node:18-alpine                   0.4s 
 => [house-edge internal] load .dockerignore                                                   0.0s
 => => transferring context: 2B                                                                0.0s 
 => [house-edge 1/6] FROM docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e3fe9bf  0.3s 
 => => resolve docker.io/library/node:18-alpine@sha256:e0340f26173b41066d68e3fe9bfbdb6571ab3c  0.3s 
 => [house-edge internal] load build context                                                   0.0s 
 => => transferring context: 2.22kB                                                            0.0s
 => CACHED [house-edge 2/6] WORKDIR /app                                                       0.0s
 => CACHED [house-edge 3/6] COPY package*.json ./                                              0.0s 
 => CACHED [house-edge 4/6] RUN npm install                                                    0.0s 
 => CACHED [house-edge 5/6] COPY . .                                                           0.0s 
 => CACHED [house-edge 6/6] RUN npm list shuffle-array || npm install shuffle-array            0.0s 
 => [house-edge] exporting to image                                                            0.2s 
 => => exporting layers                                                                        0.0s 
 => => exporting manifest sha256:84bcc320b05eeafcf6ada0dc1498c9e20cb2b99c6053e6c92ba73fd0a5de  0.0s 
 => => exporting config sha256:7795fabc27598eb3ed560108d115c254a86f740bc881eece0118a3ca585507  0.0s 
 => => exporting attestation manifest sha256:9240d92d5805362f7924eb33783cd862e69511b561a67358  0.1s 
 => => exporting manifest list sha256:061c203b7f4f934c500b46251d286135eb6aaf3a16505251d00c9ac  0.0s 
 => => naming to docker.io/library/baccarat-engine-master-house-edge:latest                    0.0s 
 => => unpacking to docker.io/library/baccarat-engine-master-house-edge:latest                 0.0s 
 => [house-edge] resolving provenance for metadata file                                        0.0s 
[+] Running 2/2
 ✔ house-edge                                     Built                                        0.0s 
 ✔ Container baccarat-engine-master-house-edge-1  Recreated                                    0.6s 
Attaching to house-edge-1
house-edge-1  |
house-edge-1  | ==== House Edge Compounding Analysis: Flat Betting Strategy ====
house-edge-1  | Betting on: banker                                                                  
house-edge-1  | Number of trials per checkpoint: 10                                                 
house-edge-1  |                                                                                     
house-edge-1  | Running 10 trials of 10 hands each...                                               
house-edge-1  |   After 10 hands:                                                                   
house-edge-1  |     Average ROI: 0.07%                                                              
house-edge-1  |     Effective house edge: -7.4000%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50 hands each...                                               
house-edge-1  |   After 50 hands:                                                                   
house-edge-1  |     Average ROI: 0.31%                                                              
house-edge-1  |     Effective house edge: -6.1300%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%
house-edge-1  | Running 10 trials of 100 hands each...                                              
house-edge-1  |   After 100 hands:                                                                  
house-edge-1  |     Average ROI: -0.16%                                                             
house-edge-1  |     Effective house edge: 1.6400%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 500 hands each...                                              
house-edge-1  |   After 500 hands:                                                                  
house-edge-1  |     Average ROI: -0.42%                                                             
house-edge-1  |     Effective house edge: 0.8380%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 1,000 hands each...                                            
house-edge-1  |   After 1,000 hands:
house-edge-1  |     Average ROI: -0.77%                                                             
house-edge-1  |     Effective house edge: 0.7725%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 5,000 hands each...                                            
house-edge-1  |   After 5,000 hands:                                                                
house-edge-1  |     Average ROI: -7.07%
house-edge-1  |     Effective house edge: 1.4146%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 10,000 hands each...                                           
house-edge-1  |   After 10,000 hands:                                                               
house-edge-1  |     Average ROI: -9.71%
house-edge-1  |     Effective house edge: 0.9711%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50,000 hands each...                                           
house-edge-1  |   After 50,000 hands:                                                               
house-edge-1  |     Average ROI: -52.96%
house-edge-1  |     Effective house edge: 1.0592%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100,000 hands each...                                          
house-edge-1  |   After 100,000 hands:                                                              
house-edge-1  |     Average ROI: -92.86%
house-edge-1  |     Effective house edge: 1.2566%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  |                                                                                     
house-edge-1  | ==== Compounding Effect Analysis for Flat Betting ====                              
house-edge-1  | Theoretical house edge for banker bets: 1.06%                                       
house-edge-1  | From 10 to 50 hands:                                                                
house-edge-1  |   Effective edge increased from -7.4000% to -6.1300%                                
house-edge-1  |   Relative change: -17.16%                                                          
house-edge-1  |   Edge multiplier vs theoretical: -5.78x                                            
house-edge-1  | From 50 to 100 hands:                                                               
house-edge-1  |   Effective edge increased from -6.1300% to 1.6400%                                 
house-edge-1  |   Relative change: -126.75%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 1.55x                                             
house-edge-1  | From 100 to 500 hands:                                                              
house-edge-1  |   Effective edge increased from 1.6400% to 0.8380%                                  
house-edge-1  |   Relative change: -48.90%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 0.79x
house-edge-1  | From 500 to 1,000 hands:                                                            
house-edge-1  |   Effective edge increased from 0.8380% to 0.7725%                                  
house-edge-1  |   Relative change: -7.82%                                                           
house-edge-1  |   Edge multiplier vs theoretical: 0.73x                                             
house-edge-1  | From 1,000 to 5,000 hands:                                                          
house-edge-1  |   Effective edge increased from 0.7725% to 1.4146%                                  
house-edge-1  |   Relative change: +83.12%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 1.33x                                             
house-edge-1  | From 5,000 to 10,000 hands:                                                         
house-edge-1  |   Effective edge increased from 1.4146% to 0.9711%                                  
house-edge-1  |   Relative change: -31.35%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 0.92x                                             
house-edge-1  | From 10,000 to 50,000 hands:
house-edge-1  |   Effective edge increased from 0.9711% to 1.0592%                                  
house-edge-1  |   Relative change: +9.07%                                                           
house-edge-1  |   Edge multiplier vs theoretical: 1.00x                                             
house-edge-1  | From 50,000 to 100,000 hands:                                                       
house-edge-1  |   Effective edge increased from 1.0592% to 1.2566%                                  
house-edge-1  |   Relative change: +18.64%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 1.19x                                             
house-edge-1  |                                                                                     
house-edge-1  | ==== House Edge Compounding Analysis: Fibonacci Strategy ====                       
house-edge-1  | Betting on: banker                                                                  
house-edge-1  | Number of trials per checkpoint: 10                                                 
house-edge-1  |                                                                                     
house-edge-1  | Running 10 trials of 10 hands each...                                               
house-edge-1  |   After 10 hands:
house-edge-1  |     Average ROI: -0.01%                                                             
house-edge-1  |     Effective house edge: 1.4500%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50 hands each...                                               
house-edge-1  |   After 50 hands:                                                                   
house-edge-1  |     Average ROI: 0.08%                                                              
house-edge-1  |     Effective house edge: -1.5900%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100 hands each...                                              
house-edge-1  |   After 100 hands:                                                                  
house-edge-1  |     Average ROI: -10.43%                                                            
house-edge-1  |     Effective house edge: 303.9705%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%
house-edge-1  | Running 10 trials of 500 hands each...                                              
house-edge-1  |   After 500 hands:                                                                  
house-edge-1  |     Average ROI: 0.23%                                                              
house-edge-1  |     Effective house edge: -0.4650%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 1,000 hands each...                                            
house-edge-1  |   After 1,000 hands:                                                                
house-edge-1  |     Average ROI: 1.81%                                                              
house-edge-1  |     Effective house edge: -1.8140%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 5,000 hands each...                                            
house-edge-1  |   After 5,000 hands:
house-edge-1  |     Average ROI: -0.35%                                                             
house-edge-1  |     Effective house edge: 0.0704%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 10,000 hands each...                                           
house-edge-1  |   After 10,000 hands:                                                               
house-edge-1  |     Average ROI: -21.61%                                                            
house-edge-1  |     Effective house edge: 7.4266%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50,000 hands each...                                           
house-edge-1  |   After 50,000 hands:                                                               
house-edge-1  |     Average ROI: -68.14%
house-edge-1  |     Effective house edge: 12.0784%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100,000 hands each...                                          
house-edge-1  |   After 100,000 hands:                                                              
house-edge-1  |     Average ROI: -56.79%
house-edge-1  |     Effective house edge: 7.7366%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  |                                                                                     
house-edge-1  | ==== Compounding Effect Analysis for Fibonacci ====                                 
house-edge-1  | Theoretical house edge for banker bets: 1.06%                                       
house-edge-1  | From 10 to 50 hands:                                                                
house-edge-1  |   Effective edge increased from 1.4500% to -1.5900%                                 
house-edge-1  |   Relative change: -209.66%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -1.50x                                            
house-edge-1  | From 50 to 100 hands:                                                               
house-edge-1  |   Effective edge increased from -1.5900% to 303.9705%
house-edge-1  |   Relative change: -19217.64%                                                       
house-edge-1  |   Edge multiplier vs theoretical: 286.76x                                           
house-edge-1  | From 100 to 500 hands:                                                              
house-edge-1  |   Effective edge increased from 303.9705% to -0.4650%                               
house-edge-1  |   Relative change: -100.15%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -0.44x                                            
house-edge-1  | From 500 to 1,000 hands:                                                            
house-edge-1  |   Effective edge increased from -0.4650% to -1.8140%                                
house-edge-1  |   Relative change: +290.11%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -1.71x                                            
house-edge-1  | From 1,000 to 5,000 hands:                                                          
house-edge-1  |   Effective edge increased from -1.8140% to 0.0704%
house-edge-1  |   Relative change: -103.88%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 0.07x                                             
house-edge-1  | From 5,000 to 10,000 hands:                                                         
house-edge-1  |   Effective edge increased from 0.0704% to 7.4266%                                  
house-edge-1  |   Relative change: +10449.08%                                                       
house-edge-1  |   Edge multiplier vs theoretical: 7.01x                                             
house-edge-1  | From 10,000 to 50,000 hands:                                                        
house-edge-1  |   Effective edge increased from 7.4266% to 12.0784%                                 
house-edge-1  |   Relative change: +62.64%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 11.39x                                            
house-edge-1  | From 50,000 to 100,000 hands:                                                       
house-edge-1  |   Effective edge increased from 12.0784% to 7.7366%
house-edge-1  |   Relative change: -35.95%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 7.30x                                             
house-edge-1  |                                                                                     
house-edge-1  | ==== House Edge Compounding Analysis: Martingale Strategy ====                      
house-edge-1  | Betting on: banker                                                                  
house-edge-1  | Number of trials per checkpoint: 10                                                 
house-edge-1  |                                                                                     
house-edge-1  | Running 10 trials of 10 hands each...                                               
house-edge-1  |   After 10 hands:                                                                   
house-edge-1  |     Average ROI: -0.12%                                                             
house-edge-1  |     Effective house edge: 11.9000%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50 hands each...
house-edge-1  |   After 50 hands:                                                                   
house-edge-1  |     Average ROI: -3.77%                                                             
house-edge-1  |     Effective house edge: 107.0668%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100 hands each...                                              
house-edge-1  |   After 100 hands:                                                                  
house-edge-1  |     Average ROI: 4.08%                                                              
house-edge-1  |     Effective house edge: -40.8200%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 500 hands each...                                              
house-edge-1  |   After 500 hands:
house-edge-1  |     Average ROI: -3.39%                                                             
house-edge-1  |     Effective house edge: 23.5358%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 1,000 hands each...                                            
house-edge-1  |   After 1,000 hands:                                                                
house-edge-1  |     Average ROI: -11.53%                                                            
house-edge-1  |     Effective house edge: 47.4724%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 5,000 hands each...                                            
house-edge-1  |   After 5,000 hands:                                                                
house-edge-1  |     Average ROI: 37.33%                                                             
house-edge-1  |     Effective house edge: 11.5179%
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 10,000 hands each...                                           
house-edge-1  |   After 10,000 hands:                                                               
house-edge-1  |     Average ROI: -56.04%                                                            
house-edge-1  |     Effective house edge: 806.0901%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50,000 hands each...                                           
house-edge-1  |   After 50,000 hands:                                                               
house-edge-1  |     Average ROI: 126.38%                                                            
house-edge-1  |     Effective house edge: 69.5071%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100,000 hands each...
house-edge-1  |   After 100,000 hands:                                                              
house-edge-1  |     Average ROI: -67.17%                                                            
house-edge-1  |     Effective house edge: 265.9291%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  |                                                                                     
house-edge-1  | ==== Compounding Effect Analysis for Martingale ====                                
house-edge-1  | Theoretical house edge for banker bets: 1.06%                                       
house-edge-1  | From 10 to 50 hands:                                                                
house-edge-1  |   Effective edge increased from 11.9000% to 107.0668%                               
house-edge-1  |   Relative change: +799.72%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 101.01x                                           
house-edge-1  | From 50 to 100 hands:
house-edge-1  |   Effective edge increased from 107.0668% to -40.8200%                              
house-edge-1  |   Relative change: -138.13%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -38.51x                                           
house-edge-1  | From 100 to 500 hands:                                                              
house-edge-1  |   Effective edge increased from -40.8200% to 23.5358%                               
house-edge-1  |   Relative change: -157.66%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 22.20x                                            
house-edge-1  | From 500 to 1,000 hands:                                                            
house-edge-1  |   Effective edge increased from 23.5358% to 47.4724%                                
house-edge-1  |   Relative change: +101.70%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 44.79x                                            
house-edge-1  | From 1,000 to 5,000 hands:                                                          
house-edge-1  |   Effective edge increased from 47.4724% to 11.5179%                                
house-edge-1  |   Relative change: -75.74%
house-edge-1  |   Edge multiplier vs theoretical: 10.87x                                            
house-edge-1  | From 5,000 to 10,000 hands:                                                         
house-edge-1  |   Effective edge increased from 11.5179% to 806.0901%                               
house-edge-1  |   Relative change: +6898.61%                                                        
house-edge-1  |   Edge multiplier vs theoretical: 760.46x                                           
house-edge-1  | From 10,000 to 50,000 hands:                                                        
house-edge-1  |   Effective edge increased from 806.0901% to 69.5071%                               
house-edge-1  |   Relative change: -91.38%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 65.57x                                            
house-edge-1  | From 50,000 to 100,000 hands:                                                       
house-edge-1  |   Effective edge increased from 69.5071% to 265.9291%                               
house-edge-1  |   Relative change: +282.59%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 250.88x
house-edge-1  |                                                                                     
house-edge-1  | ==== House Edge Compounding Analysis: D'Alembert Strategy ====                      
house-edge-1  | Betting on: banker                                                                  
house-edge-1  | Number of trials per checkpoint: 10                                                 
house-edge-1  |                                                                                     
house-edge-1  | Running 10 trials of 10 hands each...                                               
house-edge-1  |   After 10 hands:                                                                   
house-edge-1  |     Average ROI: -0.57%                                                             
house-edge-1  |     Effective house edge: 56.8000%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50 hands each...                                               
house-edge-1  |   After 50 hands:
house-edge-1  |     Average ROI: 0.61%                                                              
house-edge-1  |     Effective house edge: -12.1100%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100 hands each...                                              
house-edge-1  |   After 100 hands:                                                                  
house-edge-1  |     Average ROI: 3.76%                                                              
house-edge-1  |     Effective house edge: -37.6100%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 500 hands each...                                              
house-edge-1  |   After 500 hands:                                                                  
house-edge-1  |     Average ROI: -33.00%                                                            
house-edge-1  |     Effective house edge: 441.0954%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%
house-edge-1  | Running 10 trials of 1,000 hands each...                                            
house-edge-1  |   After 1,000 hands:                                                                
house-edge-1  |     Average ROI: -5.55%                                                             
house-edge-1  |     Effective house edge: 45.2762%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 5,000 hands each...                                            
house-edge-1  |   After 5,000 hands:                                                                
house-edge-1  |     Average ROI: -94.84%                                                            
house-edge-1  |     Effective house edge: 496.4472%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 10,000 hands each...                                           
house-edge-1  |   After 10,000 hands:                                                               
house-edge-1  |     Average ROI: -41.81%                                                            
house-edge-1  |     Effective house edge: 979.1834%
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50,000 hands each...                                           
house-edge-1  |   After 50,000 hands:                                                               
house-edge-1  |     Average ROI: -92.73%                                                            
house-edge-1  |     Effective house edge: 1047.8502%                                                
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100,000 hands each...                                          
house-edge-1  |   After 100,000 hands:                                                              
house-edge-1  |     Average ROI: -90.08%                                                            
house-edge-1  |     Effective house edge: 4237.1133%                                                
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  |                                                                                     
house-edge-1  | ==== Compounding Effect Analysis for D'Alembert ====
house-edge-1  | Theoretical house edge for banker bets: 1.06%                                       
house-edge-1  | From 10 to 50 hands:                                                                
house-edge-1  |   Effective edge increased from 56.8000% to -12.1100%                               
house-edge-1  |   Relative change: -121.32%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -11.42x                                           
house-edge-1  | From 50 to 100 hands:                                                               
house-edge-1  |   Effective edge increased from -12.1100% to -37.6100%                              
house-edge-1  |   Relative change: +210.57%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -35.48x                                           
house-edge-1  | From 100 to 500 hands:                                                              
house-edge-1  |   Effective edge increased from -37.6100% to 441.0954%                              
house-edge-1  |   Relative change: -1272.81%                                                        
house-edge-1  |   Edge multiplier vs theoretical: 416.13x                                           
house-edge-1  | From 500 to 1,000 hands:
house-edge-1  |   Effective edge increased from 441.0954% to 45.2762%                               
house-edge-1  |   Relative change: -89.74%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 42.71x                                            
house-edge-1  | From 1,000 to 5,000 hands:                                                          
house-edge-1  |   Effective edge increased from 45.2762% to 496.4472%                               
house-edge-1  |   Relative change: +996.49%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 468.35x                                           
house-edge-1  | From 5,000 to 10,000 hands:                                                         
house-edge-1  |   Effective edge increased from 496.4472% to 979.1834%                              
house-edge-1  |   Relative change: +97.24%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 923.76x                                           
house-edge-1  | From 10,000 to 50,000 hands:                                                        
house-edge-1  |   Effective edge increased from 979.1834% to 1047.8502%                             
house-edge-1  |   Relative change: +7.01%
house-edge-1  |   Edge multiplier vs theoretical: 988.54x                                           
house-edge-1  | From 50,000 to 100,000 hands:                                                       
house-edge-1  |   Effective edge increased from 1047.8502% to 4237.1133%                            
house-edge-1  |   Relative change: +304.36%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 3997.28x                                          
house-edge-1  |                                                                                     
house-edge-1  | ==== House Edge Compounding Analysis: Labouchère Strategy ====                      
house-edge-1  | Betting on: banker                                                                  
house-edge-1  | Number of trials per checkpoint: 10                                                 
house-edge-1  |                                                                                     
house-edge-1  | Running 10 trials of 10 hands each...                                               
house-edge-1  |   After 10 hands:                                                                   
house-edge-1  |     Average ROI: 0.87%
house-edge-1  |     Effective house edge: -86.7500%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50 hands each...                                               
house-edge-1  |   After 50 hands:                                                                   
house-edge-1  |     Average ROI: 1.87%                                                              
house-edge-1  |     Effective house edge: -37.4000%                                                 
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 100 hands each...                                              
house-edge-1  |   After 100 hands:                                                                  
house-edge-1  |     Average ROI: -5.88%                                                             
house-edge-1  |     Effective house edge: 58.7800%
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 500 hands each...                                              
house-edge-1  |   After 500 hands:                                                                  
house-edge-1  |     Average ROI: 3.11%                                                              
house-edge-1  |     Effective house edge: -6.2110%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 1,000 hands each...                                            
house-edge-1  |   After 1,000 hands:                                                                
house-edge-1  |     Average ROI: -13.77%                                                            
house-edge-1  |     Effective house edge: 13.7665%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 5,000 hands each...                                            
house-edge-1  |   After 5,000 hands:                                                                
house-edge-1  |     Average ROI: -27.09%                                                            
house-edge-1  |     Effective house edge: 63.3207%                                                  
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 10,000 hands each...                                           
house-edge-1  |   After 10,000 hands:                                                               
house-edge-1  |     Average ROI: -40.12%                                                            
house-edge-1  |     Effective house edge: 4.0872%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  | Running 10 trials of 50,000 hands each...                                           
house-edge-1  |   After 50,000 hands:                                                               
house-edge-1  |     Average ROI: -98.82%                                                            
house-edge-1  |     Effective house edge: 23.4306%                                                  
house-edge-1  |     Bankruptcy rate: 10.00%                                                         
house-edge-1  | Running 10 trials of 100,000 hands each...
house-edge-1  |   After 100,000 hands:                                                              
house-edge-1  |     Average ROI: -99.70%
house-edge-1  |     Effective house edge: 5.9546%                                                   
house-edge-1  |     Bankruptcy rate: 0.00%                                                          
house-edge-1  |                                                                                     
house-edge-1  | ==== Compounding Effect Analysis for Labouchère ====
house-edge-1  | Theoretical house edge for banker bets: 1.06%                                       
house-edge-1  | From 10 to 50 hands:                                                                
house-edge-1  |   Effective edge increased from -86.7500% to -37.4000%                              
house-edge-1  |   Relative change: -56.89%                                                          
house-edge-1  |   Edge multiplier vs theoretical: -35.28x                                           
house-edge-1  | From 50 to 100 hands:                                                               
house-edge-1  |   Effective edge increased from -37.4000% to 58.7800%                               
house-edge-1  |   Relative change: -257.17%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 55.45x                                            
house-edge-1  | From 100 to 500 hands:
house-edge-1  |   Effective edge increased from 58.7800% to -6.2110%                                
house-edge-1  |   Relative change: -110.57%                                                         
house-edge-1  |   Edge multiplier vs theoretical: -5.86x                                            
house-edge-1  | From 500 to 1,000 hands:                                                            
house-edge-1  |   Effective edge increased from -6.2110% to 13.7665%                                
house-edge-1  |   Relative change: -321.65%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 12.99x                                            
house-edge-1  | From 1,000 to 5,000 hands:                                                          
house-edge-1  |   Effective edge increased from 13.7665% to 63.3207%                                
house-edge-1  |   Relative change: +359.96%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 59.74x
house-edge-1  | From 5,000 to 10,000 hands:                                                         
house-edge-1  |   Effective edge increased from 63.3207% to 4.0872%                                 
house-edge-1  |   Relative change: -93.55%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 3.86x                                             
house-edge-1  | From 10,000 to 50,000 hands:                                                        
house-edge-1  |   Effective edge increased from 4.0872% to 23.4306%                                 
house-edge-1  |   Relative change: +473.27%                                                         
house-edge-1  |   Edge multiplier vs theoretical: 22.10x                                            
house-edge-1  | From 50,000 to 100,000 hands:                                                       
house-edge-1  |   Effective edge increased from 23.4306% to 5.9546%                                 
house-edge-1  |   Relative change: -74.59%                                                          
house-edge-1  |   Edge multiplier vs theoretical: 5.62x
house-edge-1 exited with code 0
