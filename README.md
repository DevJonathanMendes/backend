# backend

## Notes

- Pipes globais ou apenas módulos?
- Pipe em providers em módulos ou em decoradores de chamadas?
- Pipe para tratamento de dados ou class transformer?
- Evitar Pipe sendo chamados 2 vezes nos módulos.
- Hash de senha em pipe/middleware ou em services?
- Sempre tentar reutilizar algo.

- Mudar o hash de senha do pipe, melhor mover para o service e instalar o bcrypt.

- Testar se o class validator faz 2 validações ao implement/extends uma classe (Ex: UserEntity)
- Remover a senha usando Serialize ou no Select do Prisma?
- DTOs não devem implements/extends outros DTOs.