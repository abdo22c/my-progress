/* =====================================================
   MY-PROGRESS | AI Mastery Tracker
   data.js — Complete 6-Month AI Roadmap Data
   For AI Master's Students with Python knowledge
   Focus: Advanced ML → LLMs → GenAI → MLOps → Certs
   Morocco 🇲🇦 · GitHub Student Pack · Oracle Free Access
   ===================================================== */

'use strict';

/* ═══════════════════════════════════════════════════════
   ROADMAP MONTHS DATA
   6 months of structured learning
   Each month has weeks → groups → tasks (with descriptions)
═══════════════════════════════════════════════════════ */
const DATA = {

  /* ─────────────────────────────────────────────────
     MONTHS
  ───────────────────────────────────────────────────*/
  months: [

    /* ════════════════════════════════════════════
       MONTH 1 — Advanced ML & Deep Learning
    ════════════════════════════════════════════ */
    {
      id:         1,
      title:      'Advanced ML & Deep Learning',
      shortTitle: 'Adv. ML & DL',
      emoji:      '🧠',
      description:'Push your ML knowledge to production level. Master advanced architectures, interpretability, and build your first portfolio-worthy project.',
      keyTopics:  ['XGBoost internals','Transformers from scratch','SHAP & interpretability','PyTorch advanced','Research papers'],
      deliverables:['Project 01','Kaggle medal'],

      weeks: [
        {
          id:          1,
          title:       'Advanced Supervised Learning',
          description: 'Go deep into ensemble methods, gradient boosting internals, and model interpretability — the skills that separate senior ML engineers from juniors.',
          cert:        null,
          items: [
            'Study XGBoost paper: regularized objective & tree construction',
            'Implement LightGBM with histogram-based algorithm',
            'Master Optuna for Bayesian hyperparameter optimization',
            'Build SHAP explanation system for any model',
            'Practice feature engineering on real Kaggle dataset',
          ],
          groups: [
            {
              title: 'Gradient Boosting Mastery',
              icon:  'fas fa-chart-line',
              tasks: [
                {
                  title:       'Study XGBoost internals in depth',
                  description: 'Read the original XGBoost paper. Understand the regularized objective function, approximate greedy algorithm, weighted quantile sketch, and sparsity-aware split finding. Compare mathematically with vanilla GBM.',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Master LightGBM & CatBoost differences',
                  description: 'Study LightGBM histogram-based algorithm and GOSS (Gradient-based One-Side Sampling). Understand CatBoost ordered boosting and native categorical handling. Know when to use each.',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Implement Bayesian hyperparameter tuning with Optuna',
                  description: 'Install Optuna, understand TPE (Tree-structured Parzen Estimator), implement pruning callbacks, use visualization dashboard. Compare results vs GridSearchCV. This is industry standard.',
                  tags:        ['build'],
                },
                {
                  title:       'Build SHAP explanation pipeline',
                  description: 'pip install shap. Implement TreeExplainer, KernelExplainer. Create summary plots, force plots, dependence plots, waterfall charts. Understand Shapley values from game theory.',
                  tags:        ['build','research'],
                },
              ],
            },
            {
              title: 'Feature Engineering at Scale',
              icon:  'fas fa-database',
              tasks: [
                {
                  title:       'Master target encoding with regularization',
                  description: 'Understand why naive target encoding causes leakage. Implement smoothing: encoded = (count * mean + prior_mean * k) / (count + k). Use category_encoders library. Apply to high-cardinality features.',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Automated feature engineering with Featuretools',
                  description: 'Install featuretools. Define entity sets, relationships. Run DFS (Deep Feature Synthesis). Understand primitives (transform, aggregation). Evaluate auto-generated features with feature importance.',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Feature selection: Boruta, RFE, mutual information',
                  description: 'Implement Boruta algorithm (shadow features approach). Compare with sklearn RFE, SelectKBest (mutual_info_classif), permutation importance. Build a feature selection pipeline that is robust to overfitting.',
                  tags:        ['build'],
                },
                {
                  title:       'Sklearn Pipeline with ColumnTransformer mastery',
                  description: 'Build production-grade sklearn Pipelines that combine preprocessing + model. Use ColumnTransformer for mixed-type data. Add custom transformers. This is required for clean production code.',
                  tags:        ['build'],
                },
              ],
            },
          ],
        },

        {
          id:          2,
          title:       'Deep Learning Architectures',
          description: 'Implement neural networks from scratch, master PyTorch advanced patterns, and understand the architectures that power modern AI.',
          cert:        null,
          items: [
            'Neural network from scratch in NumPy',
            'PyTorch advanced: AMP, gradient clipping, schedulers',
            'Implement ResNet, DenseNet from scratch',
            'Train on Kaggle GPU (free)',
            'Understand generative models (VAE, GAN)',
          ],
          groups: [
            {
              title: 'PyTorch Advanced Patterns',
              icon:  'fas fa-fire',
              tasks: [
                {
                  title:       'Implement neural network from scratch in NumPy',
                  description: 'Build forward pass, backpropagation, mini-batch SGD, momentum, Adam — all in NumPy without PyTorch. This cements mathematical understanding that separates real ML engineers from API callers.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Master PyTorch training patterns',
                  description: 'Implement: mixed precision training (torch.cuda.amp), gradient clipping (nn.utils.clip_grad_norm_), learning rate schedulers (CosineAnnealingWarmRestarts), gradient accumulation for large batches, custom DataLoaders with collate_fn.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Custom loss functions and metrics',
                  description: 'Implement Focal Loss, Label Smoothing, Contrastive Loss, Triplet Loss, ArcFace. Understand when each is appropriate. Build custom torchmetrics. This is essential for competition and research.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Experiment tracking with MLflow + W&B',
                  description: 'Set up MLflow locally (free, GitHub Student compatible). Log parameters, metrics, artifacts. Compare runs. Register models. Alternatively set up Weights & Biases (free for students). This is required for professional work.',
                  tags:        ['build','deploy'],
                },
              ],
            },
            {
              title: 'CNN Architectures & Computer Vision',
              icon:  'fas fa-eye',
              tasks: [
                {
                  title:       'Implement ResNet from scratch — understand skip connections',
                  description: 'Code ResNet-18/34 from scratch. Understand why residual connections solve vanishing gradients. Verify your implementation matches torchvision.models.resnet18(). Study He initialization.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Study EfficientNet compound scaling',
                  description: 'Read the EfficientNet paper. Understand compound scaling of width/depth/resolution. Study Neural Architecture Search (NAS). Implement EfficientNet-B0 transfer learning for a real task.',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Data augmentation: Albumentations & MixUp/CutMix',
                  description: 'Use albumentations library (faster than torchvision). Implement MixUp and CutMix augmentations. Build a complete augmentation pipeline. Understand test-time augmentation (TTA).',
                  tags:        ['build'],
                },
              ],
            },
            {
              title: 'Generative Models Foundations',
              icon:  'fas fa-magic',
              tasks: [
                {
                  title:       'Implement Variational Autoencoder (VAE)',
                  description: 'Build encoder → reparameterization trick → decoder. Understand ELBO loss (reconstruction + KL divergence). Train on MNIST/CelebA. Understand the latent space. This is the mathematical foundation for diffusion models.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Build DCGAN and understand GAN training',
                  description: 'Implement Deep Convolutional GAN with spectral normalization. Understand mode collapse, training instability. Implement Wasserstein loss (WGAN). Evaluate with FID score. Study why GANs are hard to train.',
                  tags:        ['build','research'],
                },
              ],
            },
          ],
        },

        {
          id:          3,
          title:       'Project 01 + Kaggle Competition',
          description: 'Build and deploy your first major portfolio project. Enter a Kaggle competition to validate your skills publicly.',
          cert:        null,
          items: [
            'Full ML system with SHAP interpretability',
            'Streamlit app deployed on Render/HuggingFace',
            'Kaggle competition submission',
            'GitHub repo with professional README',
            'LinkedIn post',
          ],
          groups: [
            {
              title: '🎯 Project 01: Advanced ML Prediction System',
              icon:  'fas fa-rocket',
              tasks: [
                {
                  title:       'Choose domain: credit scoring, medical, or demand forecasting',
                  description: 'For Morocco context: credit scoring (Attijariwafa, BMCE, CIH) or agriculture demand (OCP). Dataset from Kaggle or synthetic. The problem must be realistic and explainable to a business stakeholder.',
                  tags:        ['project'],
                },
                {
                  title:       'Full EDA with 20+ business-relevant visualizations',
                  description: 'Use plotly for interactive charts. Include: distribution analysis, correlation heatmap, target variable analysis, feature relationships, missing data patterns, outlier analysis. Write business insights, not just code.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Feature engineering pipeline (15+ engineered features)',
                  description: 'Create domain-specific features. Use Featuretools for automated features. Apply target encoding, polynomial features, interaction terms. Document WHY each feature was created.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Train 6+ models with cross-validation + Optuna',
                  description: 'Compare: LogReg baseline, RF, XGBoost, LightGBM, CatBoost, Neural Net. Use StratifiedKFold. Tune each with Optuna (100+ trials). Log all experiments to MLflow.',
                  tags:        ['project','build'],
                },
                {
                  title:       'SHAP interpretation + business report',
                  description: 'Generate SHAP summary, force, waterfall plots for best model. Write a 1-page "business report" explaining model decisions in plain language. This is what impresses non-technical stakeholders.',
                  tags:        ['project','research'],
                },
                {
                  title:       'Streamlit app + deploy on Render (free)',
                  description: 'Build: input form → prediction → confidence → SHAP explanation. Add Plotly visualizations. Write Dockerfile. Deploy to Render free tier (from GitHub Student). Add custom domain from Namecheap (free with Student Pack).',
                  tags:        ['project','deploy'],
                },
                {
                  title:       'Professional GitHub repo + LinkedIn post',
                  description: 'README with: problem, solution, architecture diagram (draw.io), results table, GIF demo, setup instructions. Write LinkedIn post: "I built X using Y, here are the results..." with screenshots.',
                  tags:        ['project'],
                },
              ],
            },
            {
              title: 'Kaggle Competition Entry',
              icon:  'fas fa-trophy',
              tasks: [
                {
                  title:       'Enter an active Kaggle competition in your domain',
                  description: 'Go to kaggle.com/competitions. Filter by "Active". Choose a tabular or CV competition matching your skills. Even without winning, a public notebook with good score builds your profile.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Publish a well-documented Kaggle notebook',
                  description: 'Write a notebook with: EDA → feature engineering → model → submission. Add markdown explanations. Aim for upvotes. This is your public proof of skills. Include references to papers.',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },

        {
          id:          4,
          title:       'Research Papers & Graph Neural Networks',
          description: 'Develop the habit of reading research papers. Learn GNNs — an emerging skill that is increasingly demanded in AI roles.',
          cert:        null,
          items: [
            'Read 4+ foundational papers',
            'Implement GCN from scratch',
            'PyTorch Geometric hands-on',
            'Paper reading system (Obsidian/Notion)',
          ],
          groups: [
            {
              title: 'Research Paper Reading System',
              icon:  'fas fa-book-reader',
              tasks: [
                {
                  title:       'Set up a paper reading workflow (Semantic Scholar + Obsidian)',
                  description: 'Use Semantic Scholar (free) to find papers. Set up Obsidian (free) with Zotero integration for note-taking. For each paper: read abstract → intro → conclusion first, then methods. Write a 1-page summary.',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Read: "Attention Is All You Need" (Vaswani et al. 2017)',
                  description: 'THE foundational paper. Read 3 times. First for overview, second for math, third for implementation details. Understand: multi-head attention, positional encoding, encoder-decoder. This paper changed everything.',
                  tags:        ['research'],
                },
                {
                  title:       'Read: "BERT: Pre-training of Deep Bidirectional Transformers"',
                  description: 'Understand MLM (Masked Language Modeling) and NSP (Next Sentence Prediction). Study how bidirectional context differs from GPT. Understand WordPiece tokenization. Note the fine-tuning approach.',
                  tags:        ['research'],
                },
                {
                  title:       'Read: "LoRA: Low-Rank Adaptation of Large Language Models"',
                  description: 'Critical paper for fine-tuning LLMs. Understand: why full fine-tuning is expensive, the rank decomposition math (W = W0 + BA), which layers to target, how to merge adapters. You will implement this in Month 3.',
                  tags:        ['research'],
                },
              ],
            },
            {
              title: 'Graph Neural Networks',
              icon:  'fas fa-project-diagram',
              tasks: [
                {
                  title:       'Understand message passing framework',
                  description: 'Learn the general GNN framework: aggregate neighbor features → update node representation. Study GCN (Kipf & Welling), GraphSAGE (Hamilton et al.), GAT (attention-based). Understand when graphs are the right data structure.',
                  tags:        ['learn','research'],
                },
                {
                  title:       'Implement GCN from scratch in PyTorch',
                  description: 'Code a Graph Convolutional Network: A_hat = D^(-1/2) * A * D^(-1/2), H = ReLU(A_hat * H * W). Train on Cora citation dataset for node classification. Compare with MLP baseline.',
                  tags:        ['build','research'],
                },
                {
                  title:       'PyTorch Geometric hands-on tutorial',
                  description: 'pip install torch-geometric. Study Data, Dataset, DataLoader classes. Implement GCN, GAT, GraphSAGE using PyG. Study molecular property prediction (QM9 dataset). Know when to use GNNs in practice.',
                  tags:        ['build','learn'],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ════════════════════════════════════════════
       MONTH 2 — NLP, Transformers & Arabic NLP
    ════════════════════════════════════════════ */
    {
      id:         2,
      title:      'NLP, Transformers & Arabic NLP',
      shortTitle: 'NLP & Arabic',
      emoji:      '💬',
      description:'Master the Transformer architecture from first principles. Develop rare expertise in Arabic and Darija NLP — a competitive advantage in the Moroccan market.',
      keyTopics:  ['Transformer math','AraBERT fine-tuning','NLP evaluation','HuggingFace expert','Darija NLP'],
      deliverables:['Project 02 (Darija NLP)','HuggingFace model'],

      weeks: [
        {
          id:          5,
          title:       'Transformer Architecture Deep Dive',
          description: 'Build transformers from mathematical foundations. Understand every component before using high-level APIs.',
          cert:        null,
          items: [
            'Implement Transformer from scratch',
            'Andrej Karpathy Let\'s Build GPT',
            'Master HuggingFace Transformers library',
            'Understand tokenization deeply (BPE, WordPiece)',
          ],
          groups: [
            {
              title: 'Transformer from Scratch',
              icon:  'fas fa-atom',
              tasks: [
                {
                  title:       'Implement scaled dot-product attention in PyTorch',
                  description: 'Code: Attention(Q,K,V) = softmax(QK^T / √d_k) * V. Implement masking for causal attention. Understand why we scale by √d_k (prevents softmax saturation). Test on toy sequence task.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Build multi-head attention and full Transformer block',
                  description: 'Implement: multi-head attention (split, attend, concat, project), position-wise FFN (two linear + ReLU), layer norm, residual connections, sinusoidal positional encoding. Verify shapes at each step.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Follow Andrej Karpathy "Let\'s Build GPT" tutorial',
                  description: 'Watch the 2-hour YouTube video. Code along exactly. Understand bigram model → self-attention → multi-head → feedforward → residuals → layer norm → transformer block → GPT. Best tutorial ever made.',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Train a character-level language model on Moroccan text',
                  description: 'Collect Moroccan news articles or Wikipedia text (Arabic + French). Train your mini-GPT on it. Generate text samples. This personalizes the learning and makes it portfolio-relevant.',
                  tags:        ['build','project'],
                },
              ],
            },
            {
              title: 'HuggingFace Ecosystem Mastery',
              icon:  'fas fa-cubes',
              tasks: [
                {
                  title:       'Master HuggingFace Transformers: AutoModel, Trainer API',
                  description: 'Study: AutoTokenizer, AutoModel, AutoModelForSequenceClassification. Use Trainer class with TrainingArguments. Understand: tokenization → model forward → loss → metrics. Complete the official HuggingFace NLP course (free).',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Understand tokenization algorithms: BPE, WordPiece, SentencePiece',
                  description: 'Implement BPE from scratch to understand the algorithm. Compare vocabulary sizes and OOV rates. Understand why subword tokenization is key for Arabic (morphologically rich). Study the fast tokenizers (Rust-based).',
                  tags:        ['research','learn'],
                },
                {
                  title:       'HuggingFace Datasets and Evaluate libraries',
                  description: 'Use datasets.load_dataset() for Arabic NLP datasets (HARD, ArSAS, MADAR). Implement custom dataset loading. Use evaluate library for metrics: BLEU, ROUGE, BERTScore, accuracy, F1.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Fine-tune BERT for text classification on Arabic news',
                  description: 'Use aubmindlab/bert-base-arabertv2. Fine-tune on Arabic news classification (positive/negative/neutral). Implement proper train/val/test split. Report: accuracy, F1, confusion matrix. Push to HuggingFace Hub.',
                  tags:        ['build','project'],
                },
              ],
            },
          ],
        },

        {
          id:          6,
          title:       'Arabic NLP Specialization',
          description: 'Develop rare expertise in Arabic and Darija NLP. This skill is extremely valuable in Morocco and the wider Arab world.',
          cert:        null,
          items: [
            'Study Arabic morphology & NLP challenges',
            'AraBERT, CAMeLBERT, MARBERT comparison',
            'Build Darija sentiment classifier',
            'Publish model on HuggingFace Hub',
          ],
          groups: [
            {
              title: 'Arabic NLP Deep Dive',
              icon:  'fas fa-language',
              tasks: [
                {
                  title:       'Study Arabic morphology and NLP challenges in depth',
                  description: 'Understand: root-pattern morphology (trilateral roots), cliticization, diacritization, dialectal variation (MSA vs Darija vs Egyptian vs Gulf), code-switching (Arabic+French in Morocco), lack of annotated data, Arabizi (transliterated Arabic).',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Compare Arabic pre-trained models: AraBERT, MARBERT, CAMeLBERT',
                  description: 'Study: AraBERT (Wikipedia+news), MARBERT (MSA+dialectal tweets), CAMeLBERT (multiple domains), AraGPT2 (generative). Compare on sentiment analysis, NER, POS tagging benchmarks. Choose right model for each task.',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Use CAMeL Tools for Arabic preprocessing',
                  description: 'pip install camel-tools. Use: morphological analyzer, disambiguator, tokenizer, POS tagger. Understand CALIMA morphological database. Compare with Farasa (segmentation, POS tagging). Essential for Arabic NLP pipeline.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Study Darija-specific resources and datasets',
                  description: 'Find: MADAR corpus (dialectal Arabic), MSDA dataset (Moroccan sentiment), DODa (Darija offensive language), Arabizi datasets. Understand the unique challenges: French+Arabic mixing, no standard orthography, informal spelling.',
                  tags:        ['research'],
                },
              ],
            },
            {
              title: '🎯 Project 02: Darija Sentiment Analyzer',
              icon:  'fas fa-star',
              tasks: [
                {
                  title:       'Collect and annotate Darija text data (500+ examples)',
                  description: 'Scrape: Moroccan Facebook pages (Marjane, Jumia, news pages), Twitter/X with Moroccan hashtags, YouTube comments on Moroccan channels. Annotate: positive/negative/neutral. Handle code-switching (French+Darija+Arabic).',
                  tags:        ['project','build'],
                },
                {
                  title:       'Build preprocessing pipeline for Darija',
                  description: 'Implement: emoji handling (many express sentiment), URL/mention removal, normalize Arabic characters (hamza variants), handle Arabizi (3=ع, 7=ح, etc.), handle French words in Darija context.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Fine-tune MARBERT/AraBERT for Darija sentiment',
                  description: 'Use UBC-NLP/MARBERT (trained on dialectal Arabic). Fine-tune with your annotated dataset. Implement class weighting for imbalance. Train on Kaggle GPU (free). Target: >80% accuracy.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Publish model on HuggingFace Hub with model card',
                  description: 'Push model: model.push_to_hub("your-name/darija-sentiment"). Write model card: intended use, training data, metrics, limitations, ethical considerations. This establishes you as a Darija NLP expert.',
                  tags:        ['project','deploy'],
                },
                {
                  title:       'Build Streamlit demo + HuggingFace Space',
                  description: 'Create Gradio or Streamlit demo. Deploy on HuggingFace Spaces (free). Show: input text → sentiment → confidence → attention visualization. Write LinkedIn post. This project alone can get you interviews.',
                  tags:        ['project','deploy'],
                },
              ],
            },
          ],
        },

        {
          id:          7,
          title:       'Advanced NLP: Seq2Seq, Generation & Evaluation',
          description: 'Master text generation, evaluation metrics, and advanced NLP tasks that go beyond classification.',
          cert:        null,
          items: [
            'Implement seq2seq with attention',
            'Study generation strategies',
            'NLP evaluation: BLEU, ROUGE, BERTScore',
            'Named Entity Recognition for Arabic',
          ],
          groups: [
            {
              title: 'Text Generation & Evaluation',
              icon:  'fas fa-pen-fancy',
              tasks: [
                {
                  title:       'Study decoding strategies: greedy, beam search, sampling',
                  description: 'Implement greedy decoding (argmax). Implement beam search (maintain k best sequences). Study: temperature scaling, top-k sampling, nucleus (top-p) sampling. Understand the quality-diversity tradeoff. Essential for working with LLMs.',
                  tags:        ['learn','research'],
                },
                {
                  title:       'Implement BLEU, ROUGE, BERTScore evaluation',
                  description: 'Use sacrebleu for BLEU (standard). Use rouge-score for ROUGE-1/2/L. Use bert-score (contextual similarity using BERT). Understand when each metric is appropriate and their limitations.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Fine-tune mT5 for Arabic text summarization',
                  description: 'Use google/mt5-small (multilingual T5). Fine-tune on Arabic news summarization dataset. Implement seq2seq training with HuggingFace Seq2SeqTrainer. Evaluate with ROUGE. This shows seq2seq mastery.',
                  tags:        ['build','project'],
                },
                {
                  title:       'Study constitutional AI and RLHF concepts',
                  description: 'Read Anthropic\'s Constitutional AI paper. Understand RLHF: reward model training, PPO fine-tuning. Study InstructGPT paper. You don\'t need to implement these, but understanding them is expected in interviews.',
                  tags:        ['research'],
                },
              ],
            },
            {
              title: 'Information Extraction',
              icon:  'fas fa-search',
              tasks: [
                {
                  title:       'Named Entity Recognition for Arabic text',
                  description: 'Use CAMeLBERT-NER or train from scratch. Implement BIO tagging scheme. Evaluate with seqeval (entity-level F1). Apply to Moroccan news articles to extract: persons, organizations, locations.',
                  tags:        ['build','project'],
                },
                {
                  title:       'Question Answering with AraBERT on Arabic SQuAD',
                  description: 'Fine-tune AraBERT on Arabic-SQuAD or TyDi QA. Implement extractive QA: find answer span in context. Evaluate with Exact Match and F1. This is foundational for building RAG systems in Month 3.',
                  tags:        ['build','learn'],
                },
              ],
            },
          ],
        },

        {
          id:          8,
          title:       'Multimodal AI & Vision-Language Models',
          description: 'Understand and apply models that combine text and images — one of the fastest growing areas in AI.',
          cert:        null,
          items: [
            'CLIP: contrastive vision-language pretraining',
            'Build image-text search system',
            'Introduction to diffusion models',
            'Prepare for Month 3 (LLMs)',
          ],
          groups: [
            {
              title: 'Vision-Language Models',
              icon:  'fas fa-images',
              tasks: [
                {
                  title:       'Understand CLIP architecture and contrastive learning',
                  description: 'Study OpenAI CLIP paper. Understand contrastive pretraining: image encoder + text encoder trained together with InfoNCE loss. Zero-shot classification capability. Use clip library from OpenAI. Essential for multimodal AI.',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Build an image-text similarity search system',
                  description: 'Use CLIP to embed images and text into shared space. Store embeddings in ChromaDB/FAISS. Build search: input text → find similar images, input image → find similar images/text. Deploy as Gradio app.',
                  tags:        ['build','project'],
                },
                {
                  title:       'Study LLaVA and GPT-4V architecture concepts',
                  description: 'Read LLaVA paper (Visual Instruction Tuning). Understand how visual features are connected to LLMs via projection layer. Study the visual instruction tuning dataset creation. This is the foundation of multimodal assistants.',
                  tags:        ['research'],
                },
                {
                  title:       'Introduction to Stable Diffusion and diffusion models',
                  description: 'Study the DDPM paper (denoising diffusion probabilistic models). Understand forward process (adding noise) and reverse process (denoising with U-Net). Use diffusers library. Generate images with Stable Diffusion XL (free on Colab).',
                  tags:        ['learn','build'],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ════════════════════════════════════════════
       MONTH 3 — LLMs & Generative AI
    ════════════════════════════════════════════ */
    {
      id:         3,
      title:      'LLMs & Generative AI',
      shortTitle: 'LLMs & GenAI',
      emoji:      '⚡',
      description:'Master LLMs from API usage to fine-tuning. Build RAG systems and AI agents. These are the most in-demand skills in the AI job market right now.',
      keyTopics:  ['RAG systems','LangChain','Fine-tuning (LoRA/QLoRA)','AI Agents','Vector databases'],
      deliverables:['Project 03 (Mourafiq RAG)','Project 04 (AI Agent)','Project 05 (Darija-LLM)'],

      weeks: [
        {
          id:          9,
          title:       'LLM Fundamentals & Prompt Engineering',
          description: 'Understand how LLMs work internally and master the art and science of prompt engineering.',
          cert:        null,
          items: [
            'Study LLM architecture (GPT, LLaMA, Mistral)',
            'Master all prompting techniques',
            'OpenAI API + Anthropic API hands-on',
            'Run local LLMs with Ollama',
            'Build prompt engineering evaluation framework',
          ],
          groups: [
            {
              title: 'LLM Internals',
              icon:  'fas fa-brain',
              tasks: [
                {
                  title:       'Understand LLM architecture: tokenization to generation',
                  description: 'Study: BPE tokenization (tiktokenizer.vercel.app), embedding table, transformer blocks, KV cache (why it speeds up inference), attention patterns at different layers, scaling laws (Chinchilla paper), emergent abilities.',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Explore open-source LLM ecosystem',
                  description: 'Study and compare: LLaMA 3 (Meta, Apache 2.0), Mistral 7B (best quality/size ratio), Mixtral 8x7B (MoE), Gemma 2 (Google), Phi-3 (Microsoft, small but capable), Qwen 2.5 (Alibaba, Arabic support). Know the tradeoffs.',
                  tags:        ['learn','research'],
                },
                {
                  title:       'Run local LLMs with Ollama',
                  description: 'Install Ollama (free, runs on CPU/GPU). Run: ollama pull llama3.2, ollama pull mistral, ollama pull qwen2.5. Build a simple chat application using Ollama Python API. Compare model quality and speed.',
                  tags:        ['build','learn'],
                },
              ],
            },
            {
              title: 'Prompt Engineering Mastery',
              icon:  'fas fa-wand-magic-sparkles',
              tasks: [
                {
                  title:       'Master zero-shot, few-shot, and chain-of-thought prompting',
                  description: 'Zero-shot: direct task instruction. Few-shot: provide 3-5 examples. Chain-of-thought: "Let\'s think step by step". Self-consistency: sample multiple CoT paths, majority vote. Practice with OpenAI API (GPT-4o-mini, cheapest).',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Advanced: Tree-of-Thought, ReAct, and structured outputs',
                  description: 'Tree-of-Thought: explore multiple reasoning paths. ReAct: Reasoning + Acting (thought → action → observation loop). Structured outputs: JSON mode, function calling. These are the foundations of AI agents.',
                  tags:        ['learn','research'],
                },
                {
                  title:       'Build a prompt evaluation framework',
                  description: 'Create a systematic framework to evaluate prompt quality: consistency, accuracy, cost, latency. Use PromptFlow (Microsoft, free) or build custom evaluation. A/B test prompts. This is production-grade thinking.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Multilingual prompting for French + Arabic + Darija',
                  description: 'Test GPT-4o, Mistral, Qwen in French, MSA Arabic, and Darija. Compare quality. Build prompts that work across languages. Understand model-specific quirks for non-English languages. Document your findings.',
                  tags:        ['build','research'],
                },
              ],
            },
          ],
        },

        {
          id:          10,
          title:       'RAG Systems & Vector Databases',
          description: 'Master Retrieval-Augmented Generation — the most practical and widely deployed GenAI pattern in production.',
          cert:        null,
          items: [
            'Build naive RAG, then advanced RAG',
            'Master ChromaDB, FAISS, MongoDB Atlas Vector',
            'RAGAS evaluation framework',
            'Build Mourafiq (star project)',
          ],
          groups: [
            {
              title: 'RAG Architecture',
              icon:  'fas fa-database',
              tasks: [
                {
                  title:       'Understand RAG pipeline deeply — every component',
                  description: 'Study: Document loading → chunking (fixed, recursive, semantic) → embedding (OpenAI, sentence-transformers) → vector storage → retrieval (similarity, MMR, BM25) → context injection → generation. Study the original RAG paper (Lewis et al. 2020).',
                  tags:        ['research','learn'],
                },
                {
                  title:       'Master chunking strategies and their tradeoffs',
                  description: 'Compare: fixed-size chunking (simple), recursive text splitting (respects structure), semantic chunking (embed and split at semantic boundaries), parent-child chunking (small retrieval, large context). Test each on your Mourafiq project.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Vector databases: ChromaDB, FAISS, MongoDB Atlas',
                  description: 'ChromaDB (easiest, local): chroma.Client(). FAISS (fastest, Facebook): faiss.IndexFlatL2(). MongoDB Atlas Vector Search (free with GitHub Student): cloud, hybrid search. Understand HNSW indexing algorithm.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Advanced RAG: hybrid search, re-ranking, HyDE',
                  description: 'Hybrid search: combine dense (semantic) + sparse (BM25) retrieval. Re-ranking: use cross-encoder to rerank top-k results. HyDE: generate hypothetical document, embed it, search. Evaluate each technique with RAGAS.',
                  tags:        ['build','research'],
                },
              ],
            },
            {
              title: '🎯 Project 03: Mourafiq — Legal AI Assistant',
              icon:  'fas fa-balance-scale',
              tasks: [
                {
                  title:       'Collect Moroccan legal PDFs (Code du Travail, Moudawana, etc.)',
                  description: 'Download from: sgg.gov.ma (official), adala.justice.gov.ma. Collect: Code du Travail (labor law), Code de Commerce (commercial law), Moudawana (family code), Code Général des Impôts (tax code). These are public domain.',
                  tags:        ['project'],
                },
                {
                  title:       'Build PDF extraction and cleaning pipeline',
                  description: 'Use pdfplumber or pymupdf for extraction. Handle: Arabic text (RTL), French text, mixed pages. Clean: remove headers/footers, fix encoding, normalize whitespace. Handle article structure (Article 1, Article 2...).',
                  tags:        ['project','build'],
                },
                {
                  title:       'Implement advanced chunking for legal text',
                  description: 'Legal text has structure: Book → Chapter → Section → Article. Respect these boundaries when chunking. Add metadata: source document, article number, chapter. This makes retrieval much more precise.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Build RAG pipeline with LangChain + ChromaDB',
                  description: 'Use LangChain: PyPDFLoader → RecursiveCharacterTextSplitter → OpenAIEmbeddings/HuggingFaceEmbeddings → Chroma → RetrievalQA. Custom prompt that cites specific articles. Bilingual (FR + AR) support.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Evaluate with RAGAS framework',
                  description: 'pip install ragas. Evaluate: faithfulness (is answer grounded in context?), answer relevancy, context precision, context recall. Create 50-question test set. Report metrics. Target: faithfulness > 0.85.',
                  tags:        ['project','research'],
                },
                {
                  title:       'Streamlit chat interface + deploy',
                  description: 'Build: chat interface (st.chat_message), sidebar with code selection (labor/commercial/family), document source display, confidence indicator. Deploy on Streamlit Cloud (free) or HuggingFace Spaces.',
                  tags:        ['project','deploy'],
                },
              ],
            },
          ],
        },

        {
          id:          11,
          title:       'AI Agents & LangChain Advanced',
          description: 'Build autonomous AI agents that can reason, use tools, and complete complex multi-step tasks.',
          cert:        null,
          items: [
            'LangChain LCEL mastery',
            'ReAct and function-calling agents',
            'CrewAI multi-agent systems',
            'Build Project 04 (AI Agent)',
          ],
          groups: [
            {
              title: 'AI Agents Architecture',
              icon:  'fas fa-robot',
              tasks: [
                {
                  title:       'Master LangChain LCEL (LangChain Expression Language)',
                  description: 'LCEL is the modern way to build LangChain chains using the pipe operator (|). Build: prompt | llm | output_parser. Understand: Runnables, parallel execution, streaming, batch processing. This is the production-ready LangChain pattern.',
                  tags:        ['learn','build'],
                },
                {
                  title:       'Implement function calling and tool use',
                  description: 'Use OpenAI function calling (now "tools"). Define tools with JSON schema. Build: web search tool, calculator, code executor, database query tool. Understand how the model decides which tool to call.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Build a ReAct agent with custom tools',
                  description: 'Implement ReAct (Reason + Act) pattern: Thought → Action → Observation loop. Create tools: Tavily web search (free), Python REPL, Wikipedia lookup. Build agent that can answer multi-step questions requiring tool use.',
                  tags:        ['build','research'],
                },
                {
                  title:       'CrewAI multi-agent system',
                  description: 'pip install crewai. Design agents with roles: Researcher, Writer, Critic. Define tasks with dependencies. Implement crew with process (sequential/hierarchical). Build: a research assistant crew that searches, synthesizes, and writes reports.',
                  tags:        ['build','project'],
                },
              ],
            },
            {
              title: '🎯 Project 04: Multilingual AI Agent',
              icon:  'fas fa-globe',
              tasks: [
                {
                  title:       'Build a multilingual e-commerce agent (FR + AR + Darija)',
                  description: 'Agent that helps customers: search products, compare prices, answer questions, handle complaints — in French, Arabic, or Darija. Automatic language detection (langdetect). Route to appropriate response language.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Implement conversation memory and session management',
                  description: 'Use LangChain memory: ConversationBufferWindowMemory (last k turns), ConversationSummaryMemory (summarize old turns). Store conversations in Redis (free with GitHub Student via Railway). Handle multi-turn coherence.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Add RAG from FAQ and product documentation',
                  description: 'Ingest: FAQ documents, product catalog (JSON → text), return policy PDF. Build vector store. Agent retrieves relevant context before answering. Combine with agent tools for real-time inventory check.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Deploy with FastAPI + Docker + GitHub Actions',
                  description: 'FastAPI backend: /chat endpoint, /health endpoint. Streamlit or React frontend. Dockerize: multi-stage build. GitHub Actions CI/CD: test → build → push to Docker Hub. Deploy on DigitalOcean ($200 GitHub Student credit).',
                  tags:        ['project','deploy'],
                },
              ],
            },
          ],
        },

        {
          id:          12,
          title:       'LLM Fine-tuning & Darija-LLM Project',
          description: 'Fine-tune large language models efficiently with LoRA/QLoRA. Build the first open-source Moroccan Darija language model.',
          cert:        null,
          items: [
            'QLoRA fine-tuning on Kaggle GPU',
            'Instruction dataset creation',
            'Model evaluation and benchmarking',
            'Build Darija-LLM (Project 05)',
            'Push model to HuggingFace Hub',
          ],
          groups: [
            {
              title: 'Fine-tuning Theory & Practice',
              icon:  'fas fa-sliders',
              tasks: [
                {
                  title:       'Understand LoRA math: rank decomposition W = W0 + BA',
                  description: 'Study LoRA paper. Understand: W ∈ R^(d×k) decomposes to B ∈ R^(d×r) and A ∈ R^(r×k) where r << min(d,k). Target modules: q_proj, v_proj in attention. Merge at inference: W = W0 + (α/r)BA. Know tradeoffs of rank r.',
                  tags:        ['research'],
                },
                {
                  title:       'QLoRA: 4-bit quantization + LoRA on free GPU',
                  description: 'pip install peft trl bitsandbytes accelerate. Load model in 4-bit (BitsAndBytesConfig). Apply LoRA with PEFT. Train with SFTTrainer. Use gradient checkpointing. This allows fine-tuning 7B models on free Kaggle/Colab GPU.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Create instruction dataset in correct format',
                  description: 'Alpaca format: {"instruction": "...", "input": "...", "output": "..."}. Chat format: [{"role": "system", ...}, {"role": "user", ...}, {"role": "assistant", ...}]. Quality over quantity: 1,000 high-quality examples > 10,000 noisy ones.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Evaluate fine-tuned model: benchmark vs base model',
                  description: 'Use lm-evaluation-harness (EleutherAI, free). Evaluate on: perplexity, task-specific benchmarks. Also: human evaluation with 20 custom prompts. Compare base vs fine-tuned qualitatively and quantitatively.',
                  tags:        ['build','research'],
                },
              ],
            },
            {
              title: '🎯 Project 05: Darija-LLM',
              icon:  'fas fa-flag',
              tasks: [
                {
                  title:       'Create Darija instruction dataset (1,000+ examples)',
                  description: 'Manually create and curate: 300 Darija QA pairs, 300 instruction-following pairs, 200 creative writing prompts+responses, 200 practical tasks (recipes, advice). Translate quality English datasets to Darija. Annotate carefully.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Fine-tune Mistral-7B with QLoRA on Kaggle GPU',
                  description: 'Use Kaggle (30h GPU/week free). Config: mistralai/Mistral-7B-Instruct-v0.3, 4-bit quantization, LoRA rank=16, alpha=32, target q_proj/v_proj/k_proj/o_proj. Train for 1-3 epochs. Monitor loss carefully.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Human evaluation: compare base vs fine-tuned',
                  description: 'Create 20 evaluation prompts in Darija. Rate both models on: accuracy, fluency, Darija authenticity (0-5 scale). Ask 2-3 native Darija speakers to evaluate. Write evaluation report with examples.',
                  tags:        ['project','research'],
                },
                {
                  title:       'Push to HuggingFace Hub with complete model card',
                  description: 'Upload model + tokenizer. Write model card: language (Darija), base model, training data description, evaluation results, intended use, limitations, ethical considerations, how to use (code example). This is your public AI identity.',
                  tags:        ['project','deploy'],
                },
                {
                  title:       'Gradio demo + HuggingFace Space + blog post',
                  description: 'Deploy Gradio demo on HuggingFace Spaces (free). Write a detailed blog post (Medium or Substack): "Building the First Open-Source Darija LLM". This post can go viral in the AI Morocco community and bring interview requests.',
                  tags:        ['project','deploy'],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ════════════════════════════════════════════
       MONTH 4 — MLOps & Production Systems
    ════════════════════════════════════════════ */
    {
      id:         4,
      title:      'MLOps & Production AI Systems',
      shortTitle: 'MLOps & Cloud',
      emoji:      '⚙️',
      description:'Learn to deploy, monitor, and maintain ML/AI systems in production. This transforms you from a notebook data scientist to a production AI engineer.',
      keyTopics:  ['Docker','FastAPI','CI/CD','MLflow','Model monitoring','Oracle Cloud'],
      deliverables:['Project 06 (MLOps Pipeline)','OCI Foundations cert','OCI AI Foundations cert'],

      weeks: [
        {
          id:          13,
          title:       'Containerization & API Development',
          description: 'Master Docker and FastAPI — the two most important tools for deploying ML models in production.',
          cert:        null,
          items: [
            'Docker best practices for ML',
            'FastAPI production patterns',
            'Async endpoints for LLM serving',
            'Authentication and rate limiting',
          ],
          groups: [
            {
              title: 'Docker for ML',
              icon:  'fab fa-docker',
              tasks: [
                {
                  title:       'Write production-grade Dockerfiles for ML models',
                  description: 'Best practices: multi-stage builds (builder → runtime), use python:3.11-slim not python:3.11, cache pip installs (COPY requirements.txt first), non-root user, .dockerignore. Build images for your existing projects.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Docker Compose for multi-service ML applications',
                  description: 'Write docker-compose.yml with: API service, model service, Redis (caching), PostgreSQL (metadata), Nginx (reverse proxy). Implement health checks, restart policies, volume mounts for model weights. Test locally.',
                  tags:        ['build'],
                },
                {
                  title:       'GPU containers with nvidia-docker',
                  description: 'Study nvidia-container-runtime. Write Dockerfile for GPU inference: FROM nvidia/cuda:12.1-runtime-ubuntu22.04. Install PyTorch with CUDA. Test locally if you have GPU, or on Oracle Cloud GPU (free trial).',
                  tags:        ['learn','build'],
                },
              ],
            },
            {
              title: 'FastAPI for ML Serving',
              icon:  'fas fa-server',
              tasks: [
                {
                  title:       'Build production FastAPI for ML model serving',
                  description: 'Implement: Pydantic input/output models (validation), async endpoints (async def), lifespan events (load model on startup), error handling (HTTPException), CORS middleware, request ID tracking. Serve your Project 01 model.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Implement streaming responses for LLM APIs',
                  description: 'Use StreamingResponse with Server-Sent Events (SSE) for streaming LLM output. Implement: async generator → StreamingResponse. Test with JavaScript EventSource. This is how ChatGPT-like interfaces work.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'API authentication, rate limiting, and monitoring',
                  description: 'Implement: API key authentication (middleware), rate limiting with slowapi (based on Redis), request logging (structlog), Prometheus metrics endpoint (/metrics). Add OpenTelemetry tracing basics.',
                  tags:        ['build'],
                },
                {
                  title:       'Build a unified API for all your projects',
                  description: 'Create one FastAPI application that serves all your models: /api/v1/credit-score, /api/v1/darija-sentiment, /api/v1/chat (RAG). Document with OpenAPI (auto-generated). This becomes your personal ML API.',
                  tags:        ['build','project'],
                },
              ],
            },
          ],
        },

        {
          id:          14,
          title:       'CI/CD, MLflow & Data Versioning',
          description: 'Build automated pipelines that test, track, and deploy your ML models reliably.',
          cert:        null,
          items: [
            'GitHub Actions ML pipeline',
            'MLflow experiment tracking',
            'DVC data versioning',
            'Automated model validation',
          ],
          groups: [
            {
              title: 'CI/CD for Machine Learning',
              icon:  'fas fa-infinity',
              tasks: [
                {
                  title:       'Build GitHub Actions ML pipeline (test → build → deploy)',
                  description: 'Write .github/workflows/ml-pipeline.yml: trigger on push to main, install dependencies, run pytest, train/validate model (if data changed), build Docker image, push to Docker Hub, deploy to cloud. This is professional DevOps for ML.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Implement model validation gates in CI/CD',
                  description: 'Add automated checks: accuracy above threshold (fail if < 85%), feature drift detection (compare train vs test distributions), latency test (inference < 100ms), memory usage check. If any check fails, block deployment.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Pre-commit hooks: linting, testing, type checking',
                  description: 'Install pre-commit. Configure: black (formatting), isort (import sorting), flake8 (linting), mypy (type checking), pytest (unit tests). This enforces code quality automatically. Add to all your project repos.',
                  tags:        ['build'],
                },
              ],
            },
            {
              title: 'MLflow & Data Versioning',
              icon:  'fas fa-code-branch',
              tasks: [
                {
                  title:       'Master MLflow: tracking, registry, serving',
                  description: 'Set up MLflow server (free, local or cloud). Log: mlflow.log_param(), mlflow.log_metric(), mlflow.sklearn.log_model(). Use model registry: staging → production transitions. Serve model: mlflow models serve -m runs:/{run_id}/model.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'DVC for data and model versioning',
                  description: 'dvc init, dvc add data/. Configure remote (Google Drive or S3). Create pipeline: dvc.yaml with stages. Version datasets and trained models alongside code. This enables reproducibility — any experiment can be recreated.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Data validation with Great Expectations',
                  description: 'pip install great-expectations. Define expectations: column exists, values in range, no nulls, unique constraint. Run validation on new data batches. Integrate into CI/CD pipeline. This catches data quality issues before they corrupt models.',
                  tags:        ['build'],
                },
              ],
            },
          ],
        },

        {
          id:          15,
          title:       'Model Monitoring & Project 06',
          description: 'Learn to monitor models in production and build your MLOps showcase project.',
          cert:        null,
          items: [
            'Drift detection (Evidently AI)',
            'Model monitoring dashboard',
            'Build Project 06 (MLOps Pipeline)',
            'Deploy on Oracle Cloud Free Tier',
          ],
          groups: [
            {
              title: 'Production Model Monitoring',
              icon:  'fas fa-chart-bar',
              tasks: [
                {
                  title:       'Implement data drift and concept drift detection',
                  description: 'Use Evidently AI (free, open-source): detect data drift (Kolmogorov-Smirnov, Population Stability Index), prediction drift, feature importance changes. Generate HTML reports. Schedule weekly drift checks via GitHub Actions cron job.',
                  tags:        ['build','learn'],
                },
                {
                  title:       'Build model performance monitoring dashboard',
                  description: 'Track in production: prediction distribution, latency p50/p95/p99, error rates, throughput. Use Grafana + Prometheus (both free). Alternatively build Streamlit monitoring dashboard with MLflow data. Set up Slack/email alerts on anomalies.',
                  tags:        ['build'],
                },
              ],
            },
            {
              title: '🎯 Project 06: End-to-End MLOps Pipeline',
              icon:  'fas fa-cogs',
              tasks: [
                {
                  title:       'Integrate MLflow into Project 01 training pipeline',
                  description: 'Add MLflow tracking to your credit scoring model: log all Optuna trials, log final model artifacts, register best model. Create MLflow experiment dashboard showing model evolution across runs.',
                  tags:        ['project','build'],
                },
                {
                  title:       'Dockerize and build FastAPI serving endpoint',
                  description: 'Create /predict endpoint for your best model. Add input validation, error handling, confidence scores. Containerize with Docker. Test locally with curl and with Streamlit frontend.',
                  tags:        ['project','build'],
                },
                {
                  title:       'CI/CD with GitHub Actions (full pipeline)',
                  description: 'Trigger: push to main. Steps: run pytest → validate model accuracy → build Docker image → push to Docker Hub → deploy to Oracle Cloud. Add Slack notification on success/failure. This is your DevOps proof.',
                  tags:        ['project','build','deploy'],
                },
                {
                  title:       'Deploy on Oracle Cloud Free Tier',
                  description: 'Create OCI Free Tier account (always-free services). Deploy on: Compute VM (ARM shape, always free), or OCI Container Instances. Set up: OCI Load Balancer, OCI Certificate (HTTPS). This experience helps you pass OCI certification.',
                  tags:        ['project','deploy','cert'],
                },
                {
                  title:       'Architecture diagram + technical blog post',
                  description: 'Create: system architecture diagram (draw.io or Excalidraw). Write technical blog post: "Building Production ML with MLflow + FastAPI + Oracle Cloud". Publish on Medium. Share on LinkedIn. This demonstrates senior-level thinking.',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },

        {
          id:          16,
          title:       'Oracle Certifications: Foundations + AI Foundations',
          description: 'Leverage your free Oracle access to earn the first two certifications. Strategic order maximizes your chances of passing.',
          cert:        'OCI Foundations + AI Foundations',
          items: [
            'Complete OCI Foundations learning path',
            'Pass OCI Foundations Associate (1Z0-1085)',
            'Complete OCI AI Foundations learning path',
            'Pass OCI AI Foundations Associate (1Z0-1122)',
          ],
          groups: [
            {
              title: 'OCI Foundations Associate (1Z0-1085)',
              icon:  'fas fa-cloud',
              tasks: [
                {
                  title:       'Complete Oracle University OCI Foundations learning path',
                  description: 'Login to education.oracle.com with your free access. Find "Oracle Cloud Infrastructure Foundations" learning path. Complete all modules: Cloud Concepts, OCI Architecture (regions, ADs, FDs), Core Services (Compute, Storage, Networking), IAM, Security, Pricing.',
                  tags:        ['cert','learn'],
                },
                {
                  title:       'Hands-on practice with OCI Free Tier',
                  description: 'Create free OCI account (oracle.com/cloud/free). Practice: create Compute instance (ARM, always free), create VCN + subnet + security lists, create Object Storage bucket, create Autonomous Database (always free). Hands-on beats theory for certs.',
                  tags:        ['cert','build'],
                },
                {
                  title:       'Take practice exam and review weak areas',
                  description: 'Use Oracle\'s official practice exam (education.oracle.com/certification). Score target: >85% consistently. Review Oracle documentation for weak areas. Watch Oracle Cloud Infrastructure YouTube channel videos.',
                  tags:        ['cert'],
                },
                {
                  title:       '✅ Pass OCI Foundations Associate exam',
                  description: 'Schedule exam via PearsonVUE (free with your Oracle access). Exam: 60 questions, 90 minutes, 65% passing score. After passing: download certificate, add to LinkedIn, update resume. Add badge to email signature.',
                  tags:        ['cert'],
                },
              ],
            },
            {
              title: 'OCI AI Foundations Associate (1Z0-1122)',
              icon:  'fas fa-brain',
              tasks: [
                {
                  title:       'Complete OCI AI Foundations learning path on Oracle University',
                  description: 'Topics: AI/ML/DL fundamentals, NLP concepts, Computer Vision concepts, OCI AI Services (Language, Vision, Speech, Document Understanding), Generative AI basics, Responsible AI. You already know most of this from Months 1-3.',
                  tags:        ['cert','learn'],
                },
                {
                  title:       'Explore OCI AI Services hands-on (free)',
                  description: 'In OCI console: try OCI Language (sentiment, NER, classification in Arabic and French), OCI Vision (object detection, image classification), OCI Document Understanding (extract text from PDFs). These are real enterprise AI services.',
                  tags:        ['cert','build'],
                },
                {
                  title:       '✅ Pass OCI AI Foundations Associate exam',
                  description: 'Second certification. You will find this exam easier after Month 1-3 knowledge. Schedule immediately after Foundations. Add to LinkedIn: "Oracle OCI AI Foundations Certified". This signals AI + Cloud credibility.',
                  tags:        ['cert'],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ════════════════════════════════════════════
       MONTH 5 — GenAI Certs, Specialization & Portfolio
    ════════════════════════════════════════════ */
    {
      id:         5,
      title:      'GenAI Certifications & Specialization',
      shortTitle: 'GenAI & Certs',
      emoji:      '🏆',
      description:'Earn the most valuable Oracle certifications. Deepen your GenAI specialization. Refine your portfolio to be truly impressive.',
      keyTopics:  ['OCI GenAI Professional','OCI Data Science Pro','Advanced RAG','Evaluation frameworks','Open-source contribution'],
      deliverables:['OCI GenAI Professional cert','OCI Data Science cert','Refined portfolio'],

      weeks: [
        {
          id:          17,
          title:       'OCI Generative AI Professional Certification',
          description: 'The most valuable Oracle certification for AI professionals. Directly validates the GenAI skills employers want most.',
          cert:        'OCI GenAI Professional',
          items: [
            'OCI GenAI Service hands-on',
            'LangChain with OCI GenAI',
            'Advanced RAG on Oracle platform',
            'Pass OCI GenAI Professional (1Z0-1127)',
          ],
          groups: [
            {
              title: 'OCI Generative AI Service',
              icon:  'fas fa-stars',
              tasks: [
                {
                  title:       'Complete OCI Generative AI Professional learning path',
                  description: 'Oracle University path covers: LLM fundamentals (you know this), prompt engineering (you know this), fine-tuning on OCI, RAG with OCI, OCI GenAI service APIs, dedicated AI clusters, responsible GenAI. Focus on OCI-specific features.',
                  tags:        ['cert','learn'],
                },
                {
                  title:       'Hands-on with OCI GenAI Service',
                  description: 'In OCI console → AI Services → Generative AI. Use: generation endpoint (Cohere Command), chat endpoint, embedding endpoint. Try: playground, playground comparison, batch inference. Build a simple RAG app using OCI GenAI endpoint.',
                  tags:        ['cert','build'],
                },
                {
                  title:       'Build RAG system using LangChain + OCI GenAI',
                  description: 'Use langchain-community OCI integration: ChatOCI, OCIGenAI embeddings. Replace OpenAI in your Mourafiq project with OCI GenAI. This hands-on experience directly maps to the exam and shows Oracle platform expertise.',
                  tags:        ['cert','build'],
                },
                {
                  title:       '✅ Pass OCI Generative AI Professional (1Z0-1127)',
                  description: 'Most valuable cert. Schedule as soon as ready. 60 questions, 90 minutes. After passing: this certification is rare in Morocco. Post on LinkedIn: "I just passed the OCI Generative AI Professional certification!" with the badge. Expect connections.',
                  tags:        ['cert'],
                },
              ],
            },
            {
              title: 'Advanced GenAI Techniques',
              icon:  'fas fa-microchip',
              tasks: [
                {
                  title:       'Study and implement advanced RAG patterns',
                  description: 'Implement: RAPTOR (recursive abstractive processing for tree-organized retrieval), Self-RAG (model decides when to retrieve), Corrective RAG (evaluate and refine retrieved docs). Study LlamaIndex (alternative to LangChain with better RAG support).',
                  tags:        ['research','build'],
                },
                {
                  title:       'LLM evaluation frameworks: Langsmith, RAGAS, DeepEval',
                  description: 'LangSmith (LangChain tracing, free tier). RAGAS (RAG evaluation, open-source). DeepEval (LLM evaluation framework, open-source). Build a comprehensive evaluation suite for your RAG and agent projects.',
                  tags:        ['build','research'],
                },
                {
                  title:       'Study emerging: LLM routing, mixture of experts',
                  description: 'LLM routing: use cheap model for simple queries, expensive for complex (RouteLLM). Mixture of Experts: how Mixtral works. Function calling improvements in Claude/GPT-4. Study the OpenAI Assistants API and its file search.',
                  tags:        ['research'],
                },
              ],
            },
          ],
        },

        {
          id:          18,
          title:       'OCI Data Science Professional Certification',
          description: 'Complete your Oracle certification portfolio with the Data Science professional exam.',
          cert:        'OCI Data Science Professional',
          items: [
            'OCI Data Science platform hands-on',
            'ML pipelines on OCI',
            'Model catalog and versioning',
            'Pass OCI Data Science Pro (1Z0-1110)',
          ],
          groups: [
            {
              title: 'OCI Data Science Platform',
              icon:  'fas fa-flask',
              tasks: [
                {
                  title:       'Master OCI Data Science service',
                  description: 'In OCI console → Data Science. Study: Projects → Notebook Sessions → Model Catalog → Model Deployments → Jobs → Pipelines. Create a notebook session (VM.Standard.E3.Flex, free trial). Run your ML code in OCI environment.',
                  tags:        ['cert','build'],
                },
                {
                  title:       'Build ML pipeline on OCI Data Science',
                  description: 'Use OCI Data Science Pipelines: define steps (data prep → train → evaluate → deploy). Use Accelerated Data Science SDK (ads library). Store model in OCI Model Catalog. Deploy as OCI Model Deployment endpoint.',
                  tags:        ['cert','build'],
                },
                {
                  title:       'OCI Feature Store and Data Labeling',
                  description: 'Study OCI Feature Store: create feature groups, ingest features, retrieve for training/serving. Use OCI Data Labeling: create labeling dataset, label images/text, export annotations. These are enterprise MLOps features.',
                  tags:        ['cert','learn'],
                },
                {
                  title:       '✅ Pass OCI Data Science Professional (1Z0-1110)',
                  description: 'Fourth and final certification. You now have: OCI Foundations + OCI AI Foundations + OCI GenAI Professional + OCI Data Science Professional. This full set is extremely rare in Morocco. Your LinkedIn profile now stands out dramatically.',
                  tags:        ['cert'],
                },
              ],
            },
          ],
        },

        {
          id:          19,
          title:       'Open Source Contribution & Portfolio Polish',
          description: 'Contribute to open-source AI projects and make your portfolio truly impressive to recruiters.',
          cert:        null,
          items: [
            'Open source contribution (LangChain/HuggingFace)',
            'Improve all project READMEs',
            'Record demo videos for each project',
            'Write 3 technical blog posts',
          ],
          groups: [
            {
              title: 'Open Source Contribution',
              icon:  'fab fa-github',
              tasks: [
                {
                  title:       'Contribute to LangChain, HuggingFace, or LlamaIndex',
                  description: 'Start with: fix documentation, add examples, fix small bugs (good-first-issue label). For Arabic NLP: contribute Arabic support, Darija examples. Open source contribution proves collaboration, code quality, and passion beyond coursework.',
                  tags:        ['build','project'],
                },
                {
                  title:       'Create an Arabic/Darija NLP resource on GitHub',
                  description: 'Create a curated GitHub repo: "Awesome Arabic NLP" or "Darija NLP Resources". Include: datasets, models, papers, tools. Write clear README. Share on LinkedIn and in NLP communities. This positions you as a domain expert.',
                  tags:        ['project'],
                },
              ],
            },
            {
              title: 'Portfolio Perfection',
              icon:  'fas fa-star',
              tasks: [
                {
                  title:       'Record 2-3 minute demo videos for each project',
                  description: 'Use OBS Studio (free). Show: problem → demo → results → technical highlights. Host on YouTube (unlisted or public). Embed in GitHub READMEs and LinkedIn posts. Video demos dramatically increase interview callback rate.',
                  tags:        ['project'],
                },
                {
                  title:       'Write 3 technical blog posts on Medium',
                  description: 'Post 1: "Building Mourafiq: RAG for Moroccan Legal Documents" (technical how-to). Post 2: "Fine-tuning Mistral for Darija: Lessons Learned" (behind the scenes). Post 3: "4 Oracle AI Certifications in 3 Months" (guide). Tag appropriately.',
                  tags:        ['project'],
                },
                {
                  title:       'Build personal portfolio website',
                  description: 'Use GitHub Pages (free with Student Pack). Or use Vercel (free tier). Get .tech domain free (GitHub Student Pack). Sections: About, Projects (with demos), Certifications, Blog, Contact. Use a modern template (Hugo, Astro, or plain HTML/CSS).',
                  tags:        ['build','deploy'],
                },
                {
                  title:       'LinkedIn optimization for AI job applications',
                  description: 'Headline: "AI/ML Engineer | 4x Oracle Certified | GenAI • RAG • Arabic NLP | Open to Work 🇲🇦". About: 3 paragraphs (story, skills, seeking). Featured: top 3 projects + best blog post. Post 2-3x/week about your learnings.',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },

        {
          id:          20,
          title:       'Interview Preparation & System Design',
          description: 'Prepare specifically for AI/ML engineering interviews: theory, coding, system design, and behavioral.',
          cert:        null,
          items: [
            'ML theory interview questions (100+)',
            'LLM/GenAI interview questions',
            'ML system design practice',
            'LeetCode (Easy/Medium focus)',
          ],
          groups: [
            {
              title: 'Technical Interview Prep',
              icon:  'fas fa-chalkboard-teacher',
              tasks: [
                {
                  title:       'Master 50 ML theory interview questions',
                  description: 'Questions you must nail: bias-variance tradeoff (with math), L1 vs L2 regularization (effect on weights), gradient descent variants (momentum, Adam), backpropagation chain rule, attention mechanism (from scratch), transformer architecture whiteboard. Practice explaining aloud.',
                  tags:        ['learn'],
                },
                {
                  title:       'Master 30 LLM/GenAI interview questions',
                  description: 'Must know: How does attention work? RAG vs fine-tuning tradeoffs? How to evaluate RAG (RAGAS metrics)? What is LoRA and why? How to handle hallucinations? What is temperature/top-k/top-p? How does RLHF work? Token prediction process.',
                  tags:        ['learn'],
                },
                {
                  title:       'Practice ML system design (5 case studies)',
                  description: 'Design these systems: (1) Recommendation system for e-commerce, (2) Real-time fraud detection, (3) RAG pipeline at 1M daily queries, (4) ML monitoring for production model, (5) Multilingual chatbot for 100K users. For each: requirements → architecture → tradeoffs.',
                  tags:        ['learn','research'],
                },
                {
                  title:       'LeetCode: 30 Easy + 15 Medium (Python)',
                  description: 'Focus on: arrays, hashmaps, strings, sliding window, two pointers. These are the most common in ML engineer interviews. Use neetcode.io roadmap. For each problem: understand → implement → optimize → explain complexity.',
                  tags:        ['build'],
                },
                {
                  title:       'Implement 5 ML algorithms from scratch for interviews',
                  description: 'Implement from scratch (numpy only): linear regression, logistic regression, k-means, decision tree (CART), simple neural network. Practice coding these in 20-30 minutes. Interviewers often ask this to verify depth of understanding.',
                  tags:        ['build','learn'],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ════════════════════════════════════════════
       MONTH 6 — Job Search & Career Launch
    ════════════════════════════════════════════ */
    {
      id:         6,
      title:      'Job Search & Career Launch',
      shortTitle: 'Job Ready 🎯',
      emoji:      '🎯',
      description:'Active job search campaign. Apply to 50+ positions per week. Land your first AI engineering role or freelance contract.',
      keyTopics:  ['LinkedIn optimization','Upwork profile','Application strategy','Negotiation','First job'],
      deliverables:['Signed offer letter','First client (freelance)','Active income from AI'],

      weeks: [
        {
          id:          21,
          title:       'CV, LinkedIn & Application Materials',
          description: 'Create application materials that make you stand out in the competitive AI job market.',
          cert:        null,
          items: [
            'AI-optimized CV (FR + EN versions)',
            'LinkedIn full optimization',
            'Upwork profile live',
            'Malt.fr profile (French market)',
          ],
          groups: [
            {
              title: 'CV & Profile Optimization',
              icon:  'fas fa-file-user',
              tasks: [
                {
                  title:       'Write your AI Engineer CV (French + English versions)',
                  description: 'CV structure: Header (name, title, links) → Certifications (4x Oracle, at top!) → Technical Skills → Projects (6 projects with metrics) → Education → Languages. Use LaTeX or Canva Pro (GitHub Student). Quantify everything: "87% accuracy", "deployed to 1000 users".',
                  tags:        ['project'],
                },
                {
                  title:       'Optimize LinkedIn for AI recruiter searches',
                  description: 'LinkedIn SEO: use exact keywords from job descriptions in your headline, about, and experience. Keywords: "Machine Learning Engineer", "Generative AI", "RAG", "LangChain", "LLM", "MLOps", "Oracle OCI". Turn on Open to Work (visible to recruiters).',
                  tags:        ['project'],
                },
                {
                  title:       'Create Upwork profile for international freelancing',
                  description: 'Upwork: specialized title (not "AI Developer", use "Generative AI Engineer - RAG Systems & LLM Fine-tuning"). Hourly rate: start at $35/hr, increase as you get reviews. Portfolio: link your HuggingFace models and GitHub projects. Write a compelling overview.',
                  tags:        ['project'],
                },
                {
                  title:       'Create Malt.fr profile for French market',
                  description: 'Malt.fr: #1 freelance platform for French clients. Daily rate: 400-600€/day. French clients nearshore to Morocco = cost + timezone advantage. Write profile in French. Specialization: "Expert en IA Générative, RAG et LLMs".',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },

        {
          id:          22,
          title:       'Active Job Applications — Morocco Market',
          description: 'Systematic application campaign targeting AI roles in Morocco, France, and remote positions.',
          cert:        null,
          items: [
            '50 LinkedIn applications/week',
            '20 Rekrute/Emploi.ma applications/week',
            'Direct outreach to CTOs (5/week)',
            'Attend Technopark AI events',
          ],
          groups: [
            {
              title: 'Morocco Job Market',
              icon:  'fas fa-building',
              tasks: [
                {
                  title:       'Apply to top AI employers in Morocco (50+ applications)',
                  description: 'Priority targets: CGI Maroc (many AI roles), Capgemini Maroc (GenAI practice), OCP Group (AI for agriculture/mining — huge budget), Attijariwafa Bank (data science team), Devoteam Maroc, IBM Maroc. Search: "machine learning" + Casablanca/Rabat.',
                  tags:        ['project'],
                },
                {
                  title:       'Apply on Moroccan job platforms daily',
                  description: 'Platforms: rekrute.com (best in Morocco), emploi.ma, bayt.com, indeed.ma, glassdoor (Morocco). Set daily alerts. Customize cover letter for each application mentioning company name and specific role. Apply within 24h of posting.',
                  tags:        ['project'],
                },
                {
                  title:       'Direct outreach campaign to decision makers',
                  description: 'Find: Head of Data, VP Engineering, CTO at target companies on LinkedIn. Send personalized note: mention their company AI challenges, your specific project that relates, your certifications. Don\'t ask for a job — ask for a 15-minute conversation.',
                  tags:        ['project'],
                },
                {
                  title:       'Attend Technopark, UM6P, and AI Morocco events',
                  description: 'Technopark Casablanca and Rabat host regular tech events. UM6P (Mohammed VI Polytechnic) has AI seminars. Join: AI Movement Morocco Facebook group, Data Science Morocco community. Meeting people offline converts to opportunities faster than online.',
                  tags:        ['project'],
                },
              ],
            },
            {
              title: 'French & Remote Market',
              icon:  'fas fa-globe-europe',
              tasks: [
                {
                  title:       'Apply to French companies nearshoring to Morocco',
                  description: 'France nearshores AI work to Morocco (same timezone, French language, lower cost). Target: ESNs (SSII) with Morocco offices — Capgemini, Sopra Steria, Accenture, Thales. Also: French AI startups hiring remote (Welcome to the Jungle, Talent.io).',
                  tags:        ['project'],
                },
                {
                  title:       'Apply to remote international positions',
                  description: 'Platforms: LinkedIn (filter: Remote), WeWorkRemotely.com, RemoteOK.com, Arc.dev (vetted developers), Turing.com, Andela. Focus on: AI/ML Engineer, LLM Engineer, GenAI Engineer roles. Your GMT timezone works for EU + East Coast US.',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },

        {
          id:          23,
          title:       'Freelance Launch & First Clients',
          description: 'Land your first freelance contracts on international platforms. Freelancing gives faster income than employment and builds skills quickly.',
          cert:        null,
          items: [
            '15 Upwork proposals/week',
            'Fiverr AI gigs created',
            'First client onboarded',
            'Portfolio of testimonials started',
          ],
          groups: [
            {
              title: 'Freelance Strategy',
              icon:  'fas fa-handshake',
              tasks: [
                {
                  title:       'Submit 15+ Upwork proposals per week',
                  description: 'Search: "RAG chatbot", "LLM integration", "fine-tune", "AI assistant", "LangChain", "machine learning". Proposal structure: (1) show you understand their problem, (2) describe your specific relevant experience, (3) propose a solution, (4) next step. Do NOT use templates.',
                  tags:        ['project'],
                },
                {
                  title:       'Create 3 Fiverr AI gigs',
                  description: 'Gig 1: "I will build a RAG chatbot for your documents using LangChain" ($300-800). Gig 2: "I will fine-tune an LLM on your custom dataset" ($500-1500). Gig 3: "I will build an AI data analysis pipeline" ($200-500). Include portfolio screenshots.',
                  tags:        ['project'],
                },
                {
                  title:       'Define your freelance niche and rate strategy',
                  description: 'Niche: "RAG systems for legal/compliance documents" (highest value). Or: "Arabic/Multilingual NLP" (rare skill). Start rate: $35-45/hr on Upwork. Increase 20% after each positive review. Target: $60-80/hr within 3 months of first client.',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },

        {
          id:          24,
          title:       'Interviews, Negotiation & Launch',
          description: 'Convert interviews into offers. Negotiate confidently. Launch your AI career.',
          cert:        null,
          items: [
            'Interview performance (pass rate > 50%)',
            'Negotiate salary / rate',
            'Sign offer or first contract',
            'Plan Year 2 growth',
          ],
          groups: [
            {
              title: 'Interview Execution',
              icon:  'fas fa-comments',
              tasks: [
                {
                  title:       'Prepare a 5-minute project deep-dive for each interview',
                  description: 'For Mourafiq: problem (Moroccan legal AI gap) → solution (RAG with LangChain+ChromaDB) → architecture diagram → demo → metrics (RAGAS 0.87 faithfulness) → challenges (Arabic PDF extraction) → learnings. Practice until it flows naturally.',
                  tags:        ['learn'],
                },
                {
                  title:       'Research each company 30 minutes before interview',
                  description: 'Find: their AI/data team on LinkedIn, recent AI news about company, tech stack from job description, competitors, their AI products. Prepare 3 specific questions showing you\'ve done research. Interviewers remember candidates who are genuinely curious.',
                  tags:        ['learn'],
                },
                {
                  title:       'Negotiate salary with confidence',
                  description: 'Morocco benchmarks: Junior AI Eng: 15-20K MAD/mo. Mid: 22-32K MAD/mo. Senior: 35-55K MAD/mo. Remote FR: 3,000-5,000€/mo. Always ask for 20% more than your target. Negotiate: salary, remote flexibility, learning budget, equipment allowance.',
                  tags:        ['learn'],
                },
                {
                  title:       '🎉 Sign your first AI engineering offer or contract!',
                  description: 'Celebrate this milestone — 6 months of disciplined work pays off. Then immediately: set up Year 2 learning plan (MLOps specialization, AI research, salary increase path). The beginning, not the destination.',
                  tags:        ['project'],
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     PROJECTS
  ═══════════════════════════════════════════════════════ */
  projects: [
    {
      id:          1,
      title:       'Advanced ML Prediction System',
      description: 'Production-grade ML system with advanced feature engineering, ensemble models, SHAP interpretability, and deployed Streamlit app. Moroccan business context.',
      why:         'Demonstrates: feature engineering mastery, model comparison, model interpretability (SHAP), and end-to-end deployment. Every ML role requires these skills.',
      tech:        ['Scikit-learn','XGBoost','LightGBM','SHAP','Optuna','MLflow','Streamlit','Docker'],
      gradient:    'linear-gradient(135deg,#1d4ed8,#3b82f6)',
      category:    'ml',
      month:       1,
      checklist: [
        'Dataset selection and business context defined',
        'Complete EDA with 20+ visualizations',
        'Feature engineering pipeline (15+ features)',
        'MLflow experiment tracking setup',
        '6+ models trained with cross-validation',
        'Optuna hyperparameter optimization',
        'SHAP interpretability analysis',
        'Streamlit application built',
        'Dockerized and deployed on Render',
        'Professional README with GIF demo',
        'LinkedIn post published',
      ],
    },
    {
      id:          2,
      title:       'Darija Sentiment Analyzer 🇲🇦',
      description: 'First open-source NLP tool for Moroccan Darija. Fine-tuned MARBERT for sentiment analysis on social media text. Handles code-switching (French+Arabic+Darija).',
      why:         'Unique differentiator: almost no one has Arabic dialect NLP expertise. This project makes you the go-to person for Arabic NLP in Morocco.',
      tech:        ['MARBERT','HuggingFace','PyTorch','FastAPI','Streamlit','Gradio'],
      gradient:    'linear-gradient(135deg,#7c3aed,#a855f7)',
      category:    'nlp',
      month:       2,
      checklist: [
        'Darija text collected (500+ examples)',
        'Data annotated (positive/negative/neutral)',
        'Preprocessing pipeline for Darija/Arabizi',
        'MARBERT fine-tuned on Kaggle GPU',
        'Evaluation: accuracy + F1 by class',
        'Gradio demo built',
        'Model pushed to HuggingFace Hub',
        'HuggingFace Space deployed',
        'Model card written',
        'LinkedIn post + blog post published',
      ],
    },
    {
      id:          3,
      title:       'Mourafiq — Legal AI Assistant ⚖️',
      description: 'RAG-powered chatbot for Moroccan law. Ingests Code du Travail, Moudawana, Code de Commerce. Bilingual FR/AR. Evaluated with RAGAS framework.',
      why:         'Star project. Demonstrates: advanced RAG, LangChain, vector databases, evaluation, and deployment. Solves a real Moroccan problem. Gets interviews.',
      tech:        ['LangChain','ChromaDB','GPT-4','RAG','RAGAS','Streamlit','FastAPI'],
      gradient:    'linear-gradient(135deg,#0891b2,#06b6d4)',
      category:    'genai',
      month:       3,
      checklist: [
        'Moroccan legal PDFs collected',
        'PDF extraction pipeline built',
        'Legal-aware chunking implemented',
        'Vector store (ChromaDB) populated',
        'RAG pipeline built with LangChain',
        'Custom Arabic/French prompt designed',
        'RAGAS evaluation implemented',
        'Faithfulness score > 0.85 achieved',
        'Streamlit bilingual chat interface',
        'Deployed on Streamlit Cloud',
        'Demo video recorded (2-3 min)',
        'Blog post: "Building Mourafiq"',
      ],
    },
    {
      id:          4,
      title:       'Multilingual AI Agent 🌍',
      description: 'AI agent with web search, database queries, and multi-language support (FR+AR+Darija). Built with LangChain Agents and CrewAI. Dockerized and deployed.',
      why:         'Demonstrates AI agents, tool use, multilingual capability, and production deployment. Shows you can build complex AI systems, not just models.',
      tech:        ['LangChain Agents','CrewAI','FastAPI','Redis','Docker','GitHub Actions'],
      gradient:    'linear-gradient(135deg,#059669,#10b981)',
      category:    'genai',
      month:       3,
      checklist: [
        'Agent architecture designed',
        'Custom tools built (search, DB, calculator)',
        'Language detection implemented',
        'Multilingual response routing',
        'Conversation memory added',
        'RAG from FAQ documents',
        'FastAPI backend with streaming',
        'Streamlit frontend',
        'Docker Compose setup',
        'CI/CD with GitHub Actions',
        'Deployed on DigitalOcean',
      ],
    },
    {
      id:          5,
      title:       'Darija-LLM — First Moroccan LLM 🧠',
      description: 'Fine-tuned Mistral-7B for Darija Moroccan Arabic using QLoRA. First open-source Moroccan language model. Published on HuggingFace Hub with full model card.',
      why:         'This project alone can make you famous in the AI Morocco community. First of its kind. Demonstrates: fine-tuning, dataset creation, evaluation, MLOps.',
      tech:        ['Mistral-7B','QLoRA','PEFT','TRL','HuggingFace','Gradio'],
      gradient:    'linear-gradient(135deg,#dc2626,#ef4444)',
      category:    'genai',
      month:       3,
      checklist: [
        'Darija instruction dataset created (1000+ examples)',
        'Dataset formatted for fine-tuning',
        'QLoRA config optimized',
        'Training run on Kaggle GPU',
        'Loss curves monitored',
        'Human evaluation (20 prompts)',
        'Base vs fine-tuned comparison',
        'Model pushed to HuggingFace Hub',
        'Model card written',
        'Gradio demo on HuggingFace Spaces',
        'Blog post: "Fine-tuning Mistral for Darija"',
        'LinkedIn post (expect virality)',
      ],
    },
    {
      id:          6,
      title:       'MLOps Pipeline End-to-End ⚙️',
      description: 'Complete production ML pipeline: MLflow tracking → FastAPI serving → Docker → GitHub Actions CI/CD → Oracle Cloud deployment → Evidently monitoring.',
      why:         'Shows you can deploy and maintain ML systems in production. Required for MLOps, senior ML, and platform engineering roles.',
      tech:        ['MLflow','FastAPI','Docker','GitHub Actions','OCI','Evidently AI','DVC'],
      gradient:    'linear-gradient(135deg,#d97706,#f59e0b)',
      category:    'mlops',
      month:       4,
      checklist: [
        'MLflow tracking integrated',
        'FastAPI serving endpoint built',
        'Streaming endpoint for LLM',
        'Dockerfile (multi-stage build)',
        'Docker Compose for local dev',
        'GitHub Actions CI/CD pipeline',
        'Model validation gates',
        'Deployed on Oracle Cloud Free Tier',
        'Evidently AI drift monitoring',
        'Grafana dashboard (optional)',
        'Architecture diagram (draw.io)',
        'Technical blog post',
      ],
    },
    {
      id:          7,
      title:       'Multimodal Image-Text Search',
      description: 'CLIP-based image-text similarity search. Find images with text queries or images with image queries. Deployed as interactive Gradio demo.',
      why:         'Demonstrates multimodal AI understanding and embedding-based search — skills increasingly demanded in AI engineering roles.',
      tech:        ['CLIP','PyTorch','ChromaDB','Gradio','FastAPI'],
      gradient:    'linear-gradient(135deg,#7c3aed,#ec4899)',
      category:    'ml',
      month:       2,
      checklist: [
        'CLIP model loaded and tested',
        'Image+text embedding pipeline',
        'ChromaDB vector store for images',
        'Text-to-image search implemented',
        'Image-to-image search implemented',
        'Gradio interface built',
        'HuggingFace Space deployed',
        'README with demo GIF',
      ],
    },
    {
      id:          8,
      title:       'Personal AI API — All Models United',
      description: 'Unified FastAPI serving all your models: credit scoring, Darija sentiment, RAG chat, image search. Auto-generated Swagger docs. Authentication and rate limiting.',
      why:         'Shows you think in systems. A unified API across all your projects demonstrates production ML engineering thinking, not just notebook science.',
      tech:        ['FastAPI','Pydantic','Redis','Docker','Nginx','JWT Auth'],
      gradient:    'linear-gradient(135deg,#0f172a,#1e40af)',
      category:    'mlops',
      month:       4,
      checklist: [
        'FastAPI app structure (routers)',
        '/api/v1/credit-score endpoint',
        '/api/v1/darija-sentiment endpoint',
        '/api/v1/chat (RAG) endpoint',
        '/api/v1/image-search endpoint',
        'JWT authentication middleware',
        'Rate limiting (slowapi + Redis)',
        'Prometheus metrics endpoint',
        'OpenAPI documentation',
        'Dockerized and deployed',
        'API documentation page',
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     CERTIFICATIONS
  ═══════════════════════════════════════════════════════ */
  certifications: [
    {
      id:          1,
      name:        'OCI Foundations Associate',
      code:        '1Z0-1085-24',
      icon:        '☁️',
      priority:    3,
      targetMonth: 'Month 4 — Week 16',
      description: 'Foundation of all Oracle Cloud certifications. Covers core OCI services, architecture, security, and pricing. Fastest exam to prepare for — leverage your MLOps hands-on experience.',
      topics: [
        'Cloud computing concepts',
        'OCI Architecture (regions, ADs)',
        'Compute, Storage, Networking',
        'IAM & Security',
        'Monitoring & Logging',
        'Cost Management & Pricing',
        'OCI CLI & SDK basics',
      ],
      prepResources: [
        { label: 'Oracle University Learning Path', icon: 'fas fa-graduation-cap', url: 'https://education.oracle.com/learning-explorer' },
        { label: 'OCI Free Tier Practice', icon: 'fas fa-cloud', url: 'https://oracle.com/cloud/free' },
        { label: 'Official Practice Exam', icon: 'fas fa-question-circle', url: 'https://education.oracle.com/certification' },
        { label: 'OCI YouTube Channel', icon: 'fab fa-youtube', url: 'https://youtube.com/@OracleCloudInfrastructure' },
      ],
    },
    {
      id:          2,
      name:        'OCI AI Foundations Associate',
      code:        '1Z0-1122-24',
      icon:        '🤖',
      priority:    2,
      targetMonth: 'Month 4 — Week 16',
      description: 'Validates your AI/ML knowledge combined with OCI AI services. After Months 1-3, you already know most of the content. Focus study time on OCI-specific services.',
      topics: [
        'AI & ML fundamentals',
        'Deep Learning concepts',
        'NLP & Computer Vision',
        'OCI AI Services overview',
        'OCI Language & Vision services',
        'OCI Speech service',
        'Responsible & Ethical AI',
        'Generative AI basics',
      ],
      prepResources: [
        { label: 'OCI AI Foundations Path', icon: 'fas fa-graduation-cap', url: 'https://education.oracle.com' },
        { label: 'OCI AI Services Documentation', icon: 'fas fa-book', url: 'https://docs.oracle.com/en-us/iaas/Content/ai.htm' },
        { label: 'OCI Language Service Demo', icon: 'fas fa-flask', url: 'https://console.oracle.com' },
        { label: 'HuggingFace NLP Course (extra prep)', icon: 'fas fa-link', url: 'https://huggingface.co/learn/nlp-course' },
      ],
    },
    {
      id:          3,
      name:        'OCI Generative AI Professional',
      code:        '1Z0-1127-25',
      icon:        '🧠',
      priority:    1,
      targetMonth: 'Month 5 — Week 17',
      description: 'The most valuable Oracle certification right now. Directly validates GenAI skills: LLMs, RAG, fine-tuning, OCI GenAI service. Extremely rare in Morocco — major career differentiator.',
      topics: [
        'Large Language Models fundamentals',
        'Prompt Engineering techniques',
        'Fine-tuning LLMs (LoRA, RLHF)',
        'RAG architecture & implementation',
        'OCI Generative AI Service',
        'Generation & embedding models',
        'Dedicated AI clusters on OCI',
        'LangChain integration with OCI',
        'Responsible Generative AI',
        'Building GenAI applications',
      ],
      prepResources: [
        { label: 'OCI GenAI Professional Learning Path', icon: 'fas fa-graduation-cap', url: 'https://education.oracle.com' },
        { label: 'OCI GenAI Service Docs', icon: 'fas fa-book', url: 'https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm' },
        { label: 'LangChain OCI Integration', icon: 'fas fa-link', url: 'https://python.langchain.com/docs/integrations/llms/oci_generative_ai' },
        { label: 'OCI GenAI Playground', icon: 'fas fa-play', url: 'https://console.oracle.com' },
        { label: 'Official Practice Exam', icon: 'fas fa-question-circle', url: 'https://education.oracle.com/certification' },
      ],
    },
    {
      id:          4,
      name:        'OCI Data Science Professional',
      code:        '1Z0-1110-24',
      icon:        '📊',
      priority:    4,
      targetMonth: 'Month 5 — Week 18',
      description: 'Completes your Oracle certification portfolio. Covers OCI Data Science platform: notebook sessions, ML pipelines, model catalog, model deployments, feature store.',
      topics: [
        'OCI Data Science platform',
        'Notebook sessions & compute',
        'Accelerated Data Science (ADS) SDK',
        'ML Pipelines on OCI',
        'Model Catalog & versioning',
        'Model Deployments (endpoints)',
        'OCI Feature Store',
        'Data Labeling service',
        'Integration with MLflow',
        'Cost optimization',
      ],
      prepResources: [
        { label: 'OCI Data Science Learning Path', icon: 'fas fa-graduation-cap', url: 'https://education.oracle.com' },
        { label: 'ADS SDK Documentation', icon: 'fas fa-book', url: 'https://accelerated-data-science.readthedocs.io' },
        { label: 'OCI Data Science GitHub Samples', icon: 'fab fa-github', url: 'https://github.com/oracle/oci-data-science-ai-samples' },
        { label: 'OCI Data Science Free Tier', icon: 'fas fa-cloud', url: 'https://oracle.com/cloud/free' },
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     SKILLS
  ═══════════════════════════════════════════════════════ */
  skills: [
    {
      category: 'Core ML & Statistics',
      icon:     '📊',
      items: [
        { name: 'Ensemble Methods (XGBoost, LightGBM)', target: 90 },
        { name: 'Feature Engineering',                   target: 88 },
        { name: 'Model Interpretability (SHAP)',          target: 85 },
        { name: 'Hyperparameter Optimization (Optuna)',   target: 85 },
        { name: 'Bayesian Statistics',                    target: 75 },
        { name: 'Time Series Analysis',                   target: 70 },
        { name: 'Anomaly Detection',                      target: 70 },
      ],
    },
    {
      category: 'Deep Learning',
      icon:     '🧠',
      items: [
        { name: 'PyTorch (Advanced)',    target: 88 },
        { name: 'CNN Architectures',     target: 82 },
        { name: 'Transformer from Scratch', target: 80 },
        { name: 'GAN & VAE',            target: 70 },
        { name: 'Graph Neural Networks', target: 65 },
        { name: 'Diffusion Models',      target: 60 },
      ],
    },
    {
      category: 'NLP & LLMs',
      icon:     '💬',
      items: [
        { name: 'HuggingFace Transformers', target: 90 },
        { name: 'Arabic / Darija NLP',       target: 85 },
        { name: 'Fine-tuning (LoRA/QLoRA)',  target: 85 },
        { name: 'Prompt Engineering',        target: 88 },
        { name: 'Evaluation (BLEU/ROUGE/BERTScore)', target: 80 },
        { name: 'Multimodal (CLIP, LLaVA)', target: 65 },
      ],
    },
    {
      category: 'GenAI & RAG',
      icon:     '⚡',
      items: [
        { name: 'LangChain (LCEL)',         target: 90 },
        { name: 'RAG Systems',              target: 90 },
        { name: 'Vector Databases',         target: 85 },
        { name: 'AI Agents & Tool Use',     target: 82 },
        { name: 'RAG Evaluation (RAGAS)',   target: 80 },
        { name: 'LlamaIndex',               target: 70 },
      ],
    },
    {
      category: 'MLOps & Engineering',
      icon:     '⚙️',
      items: [
        { name: 'Docker & Compose',          target: 85 },
        { name: 'FastAPI (Production)',       target: 88 },
        { name: 'CI/CD (GitHub Actions)',     target: 82 },
        { name: 'MLflow',                    target: 80 },
        { name: 'Model Monitoring (Evidently)', target: 75 },
        { name: 'DVC',                       target: 72 },
        { name: 'Oracle Cloud (OCI)',         target: 80 },
      ],
    },
    {
      category: 'Programming & Tools',
      icon:     '💻',
      items: [
        { name: 'Python (Advanced)',          target: 92 },
        { name: 'SQL (Advanced)',             target: 82 },
        { name: 'Git / GitHub',              target: 88 },
        { name: 'Linux / Bash',              target: 75 },
        { name: 'TypeScript / JS (basics)',  target: 55 },
        { name: 'System Design for ML',      target: 78 },
      ],
    },
  ],

  /* ═══════════════════════════════════════════════════════
     RESOURCES
  ═══════════════════════════════════════════════════════ */
  resources: [
    /* Month 1 — Advanced ML & DL */
    {
      title:       'XGBoost: A Scalable Tree Boosting System',
      type:        'paper',
      description: 'Original XGBoost paper by Chen & Guestrin. Essential reading to truly understand gradient boosting internals, regularization, and approximate algorithms.',
      url:         'https://arxiv.org/abs/1603.02754',
      month:       1,
    },
    {
      title:       'Andrej Karpathy — Neural Networks Zero to Hero',
      type:        'video',
      description: 'Best deep learning course ever made. Builds everything from scratch: micrograd → makemore → GPT. Watch before Month 2 for transformer fundamentals.',
      url:         'https://youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ',
      month:       1,
    },
    {
      title:       'SHAP: A Unified Approach to Interpretable ML',
      type:        'paper',
      description: 'Lundberg & Lee paper introducing SHAP values. Understand the Shapley game theory foundations. Required reading for any ML engineer working with production models.',
      url:         'https://arxiv.org/abs/1705.07874',
      month:       1,
    },
    {
      title:       'StatQuest with Josh Starmer — ML Playlist',
      type:        'video',
      description: 'Clear visual explanations of ML algorithms. Watch: XGBoost series, Random Forest, SVM, Neural Nets. Perfect for solidifying theory before interviews.',
      url:         'https://youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF',
      month:       1,
    },
    {
      title:       'Optuna Documentation',
      type:        'docs',
      description: 'Official Optuna documentation. Study: trial API, samplers (TPE, CMA-ES), pruners, visualization. Optuna is now the industry standard for hyperparameter optimization.',
      url:         'https://optuna.readthedocs.io',
      month:       1,
    },
    {
      title:       'PyTorch Geometric Documentation',
      type:        'docs',
      description: 'Official PyG docs for Graph Neural Networks. Study: Data class, GCNConv, GATConv, SAGE. Includes tutorials for node classification, graph classification, link prediction.',
      url:         'https://pytorch-geometric.readthedocs.io',
      month:       1,
    },

    /* Month 2 — NLP & Transformers */
    {
      title:       'Attention Is All You Need (Vaswani et al. 2017)',
      type:        'paper',
      description: 'The Transformer paper. Read 3 times. Understand: multi-head attention, positional encoding, encoder-decoder. This paper changed AI forever.',
      url:         'https://arxiv.org/abs/1706.03762',
      month:       2,
    },
    {
      title:       'Jay Alammar — The Illustrated Transformer',
      type:        'docs',
      description: 'Best visual explanation of the Transformer architecture. Read after the paper. Makes attention mechanism and positional encoding crystal clear.',
      url:         'https://jalammar.github.io/illustrated-transformer/',
      month:       2,
    },
    {
      title:       'HuggingFace NLP Course (Free)',
      type:        'course',
      description: 'Official HuggingFace NLP course. Covers: transformers, tokenizers, fine-tuning, Trainer API, datasets library. The industry standard resource for NLP with HuggingFace.',
      url:         'https://huggingface.co/learn/nlp-course',
      month:       2,
    },
    {
      title:       'MARBERT: Deep Bidirectional Transformers for Arabic',
      type:        'paper',
      description: 'The best model for Moroccan Darija NLP. Paper explains training on 1B tweets including dialectal Arabic. Essential reading before fine-tuning for Darija.',
      url:         'https://arxiv.org/abs/2101.01785',
      month:       2,
    },
    {
      title:       'Stanford CS224N: NLP with Deep Learning',
      type:        'course',
      description: 'Stanford\'s graduate NLP course. Lectures on YouTube. Covers: word vectors, RNNs, attention, transformers, question answering, generation. Excellent theoretical depth.',
      url:         'https://web.stanford.edu/class/cs224n/',
      month:       2,
    },
    {
      title:       'CAMeL Tools Documentation',
      type:        'docs',
      description: 'Arabic NLP toolkit from NYU Abu Dhabi. Morphological analysis, disambiguation, tokenization for Arabic. Essential for preprocessing Arabic text.',
      url:         'https://camel-tools.readthedocs.io',
      month:       2,
    },

    /* Month 3 — LLMs & GenAI */
    {
      title:       'Andrej Karpathy — Intro to Large Language Models',
      type:        'video',
      description: 'Best 1-hour overview of LLMs: training, capabilities, limitations, future. Watch before starting Month 3. Karpathy explains complex concepts in simple terms.',
      url:         'https://youtube.com/watch?v=zjkBMFhNj_g',
      month:       3,
    },
    {
      title:       'LoRA: Low-Rank Adaptation of Large Language Models',
      type:        'paper',
      description: 'The LoRA paper. Understand the rank decomposition math. Essential before fine-tuning any LLM. Read alongside PEFT documentation.',
      url:         'https://arxiv.org/abs/2106.09685',
      month:       3,
    },
    {
      title:       'LangChain Documentation (LCEL)',
      type:        'docs',
      description: 'Official LangChain docs. Focus on: LCEL (Expression Language), chains, agents, memory, retrieval. Study the how-to guides for RAG and agents.',
      url:         'https://python.langchain.com/docs/',
      month:       3,
    },
    {
      title:       'RAGAS: Automated Evaluation of RAG',
      type:        'docs',
      description: 'Framework to evaluate RAG systems: faithfulness, answer relevancy, context precision, context recall. Use for Mourafiq project evaluation.',
      url:         'https://docs.ragas.io',
      month:       3,
    },
    {
      title:       'RAG paper: Retrieval-Augmented Generation (Lewis et al.)',
      type:        'paper',
      description: 'Original RAG paper from Facebook AI Research. Understand the retrieval-augmented approach vs pure parametric memory. Foundation of all production RAG systems.',
      url:         'https://arxiv.org/abs/2005.11401',
      month:       3,
    },
    {
      title:       'TRL — Transformer Reinforcement Learning (HuggingFace)',
      type:        'docs',
      description: 'HuggingFace library for fine-tuning LLMs. Study: SFTTrainer (supervised fine-tuning), DPOTrainer (preference optimization), PPOTrainer (RL from human feedback).',
      url:         'https://huggingface.co/docs/trl/',
      month:       3,
    },

    /* Month 4 — MLOps */
    {
      title:       'Docker Official Documentation',
      type:        'docs',
      description: 'Official Docker docs. Study: Dockerfile reference, Compose file reference, multi-stage builds, best practices. Essential for any production ML deployment.',
      url:         'https://docs.docker.com',
      month:       4,
    },
    {
      title:       'FastAPI Documentation',
      type:        'docs',
      description: 'Official FastAPI docs. Study: path operations, Pydantic models, dependency injection, background tasks, WebSockets, deployment. Best async Python framework for ML APIs.',
      url:         'https://fastapi.tiangolo.com',
      month:       4,
    },
    {
      title:       'MLflow Documentation',
      type:        'docs',
      description: 'Official MLflow docs. Study: tracking, model registry, serving, projects. MLflow is the most widely used experiment tracking platform in industry.',
      url:         'https://mlflow.org/docs/latest/index.html',
      month:       4,
    },
    {
      title:       'Evidently AI Documentation',
      type:        'docs',
      description: 'Open-source ML monitoring library. Study: data drift reports, model performance monitoring, custom metrics. Free and production-ready.',
      url:         'https://docs.evidentlyai.com',
      month:       4,
    },
    {
      title:       'GitHub Actions for ML (MLOps Guide)',
      type:        'docs',
      description: 'Comprehensive guide to CI/CD for ML using GitHub Actions. Covers: model training pipelines, testing, Docker build, deployment automation.',
      url:         'https://github.com/features/actions',
      month:       4,
    },

    /* Month 5-6 */
    {
      title:       'Designing ML Systems (Chip Huyen)',
      type:        'book',
      description: 'Best book on production ML systems. Covers: data engineering, feature engineering, model development, deployment, monitoring. Required reading for senior ML roles.',
      url:         'https://huyenchip.com/machine-learning-systems-design/',
      month:       5,
    },
    {
      title:       'OCI Generative AI Service Documentation',
      type:        'docs',
      description: 'Official Oracle documentation for OCI GenAI service. Study for the GenAI Professional certification. Covers: playground, API, dedicated clusters.',
      url:         'https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm',
      month:       5,
    },
    {
      title:       'LlamaIndex Documentation',
      type:        'docs',
      description: 'Alternative to LangChain with stronger RAG support. Study: data ingestion, indexing strategies, query engines, response synthesis. Good for advanced RAG.',
      url:         'https://docs.llamaindex.ai',
      month:       5,
    },
    {
      title:       'Deep Learning Interviews (Chip Huyen)',
      type:        'book',
      description: 'Free book covering ML/DL interview questions. 200+ questions with answers. Essential preparation for Month 6 interview phase.',
      url:         'https://huyenchip.com/ml-interviews-book/',
      month:       6,
    },
    {
      title:       'NeetCode — LeetCode Roadmap',
      type:        'course',
      description: 'Structured LeetCode preparation. Focus on: arrays, hashmaps, two pointers, sliding window. Covers the most common patterns in ML engineer coding interviews.',
      url:         'https://neetcode.io',
      month:       6,
    },
  ],

  /* ═══════════════════════════════════════════════════════
     GITHUB STUDENT PACK TOOLS
  ═══════════════════════════════════════════════════════ */
  githubTools: [
    /* HIGH PRIORITY — Use immediately */
    {
      name:        'GitHub Copilot',
      description: 'AI pair programmer. Autocomplete code, generate functions, write docstrings. Use EVERY DAY. Increases coding speed by 55% (GitHub research).',
      icon:        'fab fa-github',
      bg:          'rgba(255,255,255,0.08)',
      color:       '#e8eef8',
      value:       'Free ($100/yr)',
      category:    'AI Coding',
      url:         'https://github.com/features/copilot',
      priority:    'high',
    },
    {
      name:        'JetBrains PyCharm Professional',
      description: 'Best Python IDE. Advanced debugging, database tools, remote interpreter, scientific mode for Jupyter. Free for students.',
      icon:        'fas fa-code',
      bg:          'rgba(37,99,235,0.12)',
      color:       '#60a5fa',
      value:       'Free ($250/yr)',
      category:    'IDE',
      url:         'https://jetbrains.com/student/',
      priority:    'high',
    },
    {
      name:        'DigitalOcean',
      description: '$200 credit for cloud deployment. Use for: deploying your FastAPI backends, Docker containers, databases. Perfect for Project 04 and 06 deployment.',
      icon:        'fas fa-server',
      bg:          'rgba(6,182,212,0.12)',
      color:       '#06b6d4',
      value:       '$200 Credit',
      category:    'Cloud',
      url:         'https://education.github.com/pack',
      priority:    'high',
    },
    {
      name:        'Microsoft Azure',
      description: '$100 Azure credit + access to Azure AI services (OpenAI, Cognitive Services, ML Studio). Use for: GPT-4 API testing, Azure ML experimentation.',
      icon:        'fab fa-microsoft',
      bg:          'rgba(37,99,235,0.12)',
      color:       '#60a5fa',
      value:       '$100 Credit',
      category:    'Cloud',
      url:         'https://azure.microsoft.com/free/students/',
      priority:    'high',
    },
    {
      name:        'MongoDB Atlas',
      description: 'Free cloud MongoDB with vector search capability. Use for: vector database in RAG projects, conversation history storage for AI agent, feature store.',
      icon:        'fas fa-database',
      bg:          'rgba(16,185,129,0.12)',
      color:       '#10b981',
      value:       'Free M0 Cluster',
      category:    'Database',
      url:         'https://mongodb.com/students',
      priority:    'high',
    },
    {
      name:        'Namecheap Domain',
      description: 'Free .me domain for 1 year. Use for your portfolio website: yourname.me. Add custom domain to your deployed projects. Professional appearance for applications.',
      icon:        'fas fa-globe',
      bg:          'rgba(245,158,11,0.12)',
      color:       '#f59e0b',
      value:       'Free .me Domain',
      category:    'Web',
      url:         'https://education.github.com/pack',
      priority:    'high',
    },

    /* SECONDARY — Activate as needed */
    {
      name:        'GitHub Codespaces',
      description: 'Cloud development environments. 180 hours/month free. Use when your local machine can\'t handle the workload or for consistent environments.',
      icon:        'fas fa-cloud',
      bg:          'rgba(139,92,246,0.12)',
      color:       '#8b5cf6',
      value:       '180h Free/month',
      category:    'Dev Environment',
      url:         'https://github.com/features/codespaces',
      priority:    'medium',
    },
    {
      name:        'Render',
      description: 'Free web service hosting. Deploy your Streamlit apps, FastAPI backends, Docker containers. Free tier: 750 hours/month. Used for Projects 01, 02.',
      icon:        'fas fa-rocket',
      bg:          'rgba(236,72,153,0.12)',
      color:       '#ec4899',
      value:       'Free Tier',
      category:    'Deployment',
      url:         'https://render.com',
      priority:    'medium',
    },
    {
      name:        'DataCamp',
      description: '3 months free access. Use for: SQL advanced, data engineering, Spark basics. Good for filling specific skill gaps in your roadmap.',
      icon:        'fas fa-graduation-cap',
      bg:          'rgba(37,99,235,0.12)',
      color:       '#60a5fa',
      value:       '3 Months Free',
      category:    'Learning',
      url:         'https://datacamp.com/github-students',
      priority:    'medium',
    },
    {
      name:        'Educative.io',
      description: 'Interactive coding courses. Good for: system design, ML system design interview prep, advanced Python. Text-based courses with embedded code environments.',
      icon:        'fas fa-book',
      bg:          'rgba(16,185,129,0.12)',
      color:       '#10b981',
      value:       '6 Months Free',
      category:    'Learning',
      url:         'https://educative.io/github-students',
      priority:    'medium',
    },
    {
      name:        'Railway.app',
      description: 'Easy Docker deployment with free tier. Good for: Redis (AI agent memory), PostgreSQL (project metadata), simple API deployments. Better DX than DigitalOcean for small projects.',
      icon:        'fas fa-train',
      bg:          'rgba(245,158,11,0.12)',
      color:       '#f59e0b',
      value:       '$5 Credit/month',
      category:    'Deployment',
      url:         'https://railway.app',
      priority:    'medium',
    },
    {
      name:        'GitLens (VS Code)',
      description: 'Advanced Git visualization for VS Code. See who changed what and when. Essential for professional Git workflow and code review.',
      icon:        'fas fa-code-branch',
      bg:          'rgba(139,92,246,0.12)',
      color:       '#8b5cf6',
      value:       'Free Pro License',
      category:    'Dev Tools',
      url:         'https://gitlens.amod.io',
      priority:    'medium',
    },
    {
      name:        'Canva Pro',
      description: 'Professional design for: architecture diagrams, LinkedIn banners, presentation slides, README visuals. Dramatically improves portfolio presentation quality.',
      icon:        'fas fa-paint-brush',
      bg:          'rgba(236,72,153,0.12)',
      color:       '#ec4899',
      value:       'Free Pro',
      category:    'Design',
      url:         'https://canva.com/education/',
      priority:    'medium',
    },
    {
      name:        'Notion',
      description: 'Free Pro plan. Use for: research paper notes, learning journal (in addition to this app), project planning, interview preparation notes.',
      icon:        'fas fa-sticky-note',
      bg:          'rgba(255,255,255,0.06)',
      color:       '#e8eef8',
      value:       'Free Pro Plan',
      category:    'Productivity',
      url:         'https://notion.so/students',
      priority:    'medium',
    },
  ],

};