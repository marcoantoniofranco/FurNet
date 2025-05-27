import React, { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import './PostagensPage.css';

export default function PostagensPage() {
  const [postagens, setPostagens] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    descricao: '',
    categoria: '',
    arquivo: null,
  });
  const [message, setMessage] = useState('');
  const [modalPhoto, setModalPhoto] = useState(null);

  useEffect(() => {
    carregarPostagens();
    carregarCategorias();
  }, []);

  const carregarPostagens = async () => {
    try {
      const response = await fetch('http://localhost:5224/postagens');
      if (response.ok) {
        const data = await response.json();
        setPostagens(data);
      }
    } catch {
      console.error('Erro ao carregar postagens');
    }
  };

  const carregarCategorias = async () => {
    try {
      const response = await fetch('http://localhost:5224/categorias');
      if (response.ok) {
        const data = await response.json();
        setCategorias(data);
      }
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, arquivo: file });
  };

  const handleSubmit = async () => {
    if (!formData.descricao || !formData.categoria || !formData.arquivo) {
      setMessage('Por favor, preencha todos os campos e selecione um arquivo');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result.split(',')[1];

        const postagemData = {
          Descricao: formData.descricao,
          Categoria: formData.categoria,
          NomeArquivo: formData.arquivo.name,
          TipoArquivo: formData.arquivo.type,
          DadosArquivo: base64String,
          NomeUsuario: localStorage.getItem('usuarioLogado'),
        };

        const response = await fetch('http://localhost:5224/postagens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postagemData),
        });

        if (response.ok) {
          setMessage('Postagem criada com sucesso!');
          setFormData({ descricao: '', categoria: '', arquivo: null });
          setShowForm(false);
          carregarPostagens();
        } else {
          setMessage('Erro ao criar postagem');
        }
      };
      reader.readAsDataURL(formData.arquivo);
    } catch {
      setMessage('Erro de conexão com o servidor');
    }
  };

  const deletarPostagem = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta postagem?')) {
      try {
        const response = await fetch(`http://localhost:5224/postagens/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setMessage('Postagem deletada com sucesso!');
          carregarPostagens();
        } else {
          setMessage('Erro ao deletar postagem');
        }
      } catch {
        setMessage('Erro de conexão com o servidor');
      }
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const criarUrlImagem = (dadosBase64, tipoArquivo) => {
    if (!dadosBase64) return null;
    return `data:${tipoArquivo};base64,${dadosBase64}`;
  };

  const isVideo = (tipoArquivo) => {
    return tipoArquivo && tipoArquivo.startsWith('video/');
  };

  const handlePhotoClick = (postagem) => {
    setModalPhoto(postagem);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  };

  return (
    <section className="container mainContainer">
      <div className="header-section">
        <h1 className="title">Postagens</h1>
        <Button
          text={showForm ? 'Cancelar' : 'Nova Postagem'}
          onClick={() => setShowForm(!showForm)}
        />
      </div>

      {message && (
        <p className={message.includes('sucesso') ? 'success' : 'error'}>
          {message}
        </p>
      )}

      {showForm && (
        <div className="form-container">
          <InputField
            type="text"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
          />

          <select
            value={formData.categoria}
            onChange={(e) =>
              setFormData({ ...formData, categoria: e.target.value })
            }
            className="select-field"
          >
            <option value="">Selecione uma Categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="file-input"
          />

          <Button text="Criar Postagem" onClick={handleSubmit} />
        </div>
      )}

      {modalPhoto && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image">
              {isVideo(modalPhoto.tipoArquivo) ? (
                <video
                  controls
                  src={criarUrlImagem(
                    modalPhoto.dadosArquivo,
                    modalPhoto.tipoArquivo,
                  )}
                />
              ) : (
                <img
                  src={criarUrlImagem(
                    modalPhoto.dadosArquivo,
                    modalPhoto.tipoArquivo,
                  )}
                  alt={modalPhoto.descricao}
                />
              )}
            </div>
            <div className="modal-info">
              <button
                className="modal-close"
                onClick={() => setModalPhoto(null)}
              >
                ×
              </button>
              <div className="modal-header">
                <div className="modal-user">
                  <span className="modal-username">
                    @{modalPhoto.nomeUsuario || 'Usuário Anônimo'}
                  </span>
                  <span className="modal-date">
                    {formatarData(modalPhoto.dataPostagem)}
                  </span>
                </div>
                <span className="modal-category">{modalPhoto.categoria}</span>
              </div>
              <div className="modal-description">{modalPhoto.descricao}</div>
              <button
                className="modal-delete-btn"
                onClick={() => {
                  deletarPostagem(modalPhoto.id);
                  setModalPhoto(null);
                }}
              >
                Deletar Postagem
              </button>
            </div>
          </div>
        </div>
      )}

      {postagens.length === 0 ? (
        <p className="no-posts">Nenhuma postagem encontrada</p>
      ) : (
        <ul className="feed animeLeft">
          {postagens.map((postagem) => (
            <li
              key={postagem.id}
              className="photo"
              onClick={() => handlePhotoClick(postagem)}
            >
              {postagem.dadosArquivo &&
                (isVideo(postagem.tipoArquivo) ? (
                  <video
                    src={criarUrlImagem(
                      postagem.dadosArquivo,
                      postagem.tipoArquivo,
                    )}
                  />
                ) : (
                  <img
                    src={criarUrlImagem(
                      postagem.dadosArquivo,
                      postagem.tipoArquivo,
                    )}
                    alt={postagem.descricao || `Foto de ${postagem.categoria}`}
                  />
                ))}
              <span className="views">{postagem.categoria}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
